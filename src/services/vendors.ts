import { supabase } from "../lib/supabase";
import { Vendor } from "../types/marketplace";

// TODO(Phase 2): replace with the signed-in vendor's own id once Firebase Auth
// is wired in. Until then, vendor-perspective screens (VendorProducts,
// VendorPosts) operate on this single seeded vendor.
export const DEMO_VENDOR_ID = "11111111-1111-1111-1111-111111111111";

function toVendor(row: any): Vendor {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    categories: row.categories ?? [],
    verified: row.verified,
    plan: row.plan,
  };
}

export async function fetchVendors(): Promise<Vendor[]> {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .order("rating", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(toVendor);
}

export async function fetchVendorById(vendorId: string): Promise<Vendor | null> {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", vendorId)
    .maybeSingle();

  if (error) throw error;
  return data ? toVendor(data) : null;
}
