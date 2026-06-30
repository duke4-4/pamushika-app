import { supabase } from "../lib/supabase";
import { HealthyTip } from "../types/marketplace";

function toHealthyTip(row: any): HealthyTip {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    description: row.description,
    image: row.image_url ?? "",
  };
}

export async function fetchHealthyTips(): Promise<HealthyTip[]> {
  const { data, error } = await supabase
    .from("healthy_tips")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(toHealthyTip);
}
