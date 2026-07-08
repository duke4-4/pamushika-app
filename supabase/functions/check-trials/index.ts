// Pamushika IN — Daily trial expiry checker
// Triggered by pg_cron at 08:00 UTC every day.
//
// Required secrets (Supabase Dashboard → Edge Functions → Secrets):
//   AT_API_KEY    — Africa's Talking API key
//   AT_USERNAME   — Africa's Talking username (use "sandbox" for testing)
//
// Built-in secrets available automatically in Edge Functions:
//   SUPABASE_URL              — your project URL
//   SUPABASE_SERVICE_ROLE_KEY — service role key (bypasses RLS for admin reads/writes)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const AT_API_KEY = Deno.env.get("AT_API_KEY")!;
const AT_USERNAME = Deno.env.get("AT_USERNAME")!;

const PLAN_PRICES: Record<string, string> = {
  Starter: "USD 5",
  Growth: "USD 10",
  Premium: "USD 15",
};

async function sendSMS(to: string, message: string): Promise<void> {
  await fetch("https://api.africastalking.com/version1/messaging", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      apiKey: AT_API_KEY,
    },
    body: new URLSearchParams({
      username: AT_USERNAME,
      to,
      message,
      from: "PAMUSHIKA",
    }),
  });
}

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Find all vendors whose 20-day trial has now ended
  const { data: expired, error } = await supabase
    .from("vendors")
    .select(`
      id, name, plan,
      profiles!inner ( phone, full_name )
    `)
    .eq("subscription_status", "trial")
    .lt("trial_ends_at", new Date().toISOString());

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const results: { id: string; name: string; sms: string }[] = [];

  for (const vendor of expired ?? []) {
    const profile = (vendor as any).profiles as { phone: string | null; full_name: string };
    const price = PLAN_PRICES[vendor.plan] ?? "USD 5";

    if (profile.phone) {
      const msg =
        `Hi ${profile.full_name}, your 20-day free trial for ` +
        `"${vendor.name}" on Pamushika IN has ended. ` +
        `Pay ${price}/month via EcoCash or Paynow to keep your listing active. ` +
        `Open the Pamushika IN app to subscribe. Reply STOP to opt out.`;
      await sendSMS(profile.phone, msg);
    }

    // Mark expired regardless of whether we could send SMS
    await supabase
      .from("vendors")
      .update({ subscription_status: "expired" })
      .eq("id", vendor.id);

    results.push({
      id: vendor.id,
      name: vendor.name,
      sms: profile.phone ? "sent" : "no phone on record",
    });
  }

  return new Response(
    JSON.stringify({ processed: results.length, results }),
    { headers: { "Content-Type": "application/json" } }
  );
});
