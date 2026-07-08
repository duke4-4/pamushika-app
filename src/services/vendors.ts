import { supabase } from "../lib/supabase";
import { Vendor } from "../types/marketplace";

export interface CreateVendorInput {
  ownerFirebaseUid: string;
  name: string;
  location: string;
  categories: string[];
  plan: Vendor["plan"];
}

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

export async function fetchVendorByOwner(ownerFirebaseUid: string): Promise<Vendor | null> {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("owner_firebase_uid", ownerFirebaseUid)
    .maybeSingle();

  if (error) throw error;
  return data ? toVendor(data) : null;
}

export interface UpdateVendorInput {
  name?: string;
  location?: string;
  categories?: string[];
}

export async function updateVendor(vendorId: string, input: UpdateVendorInput): Promise<Vendor> {
  const patch: Record<string, unknown> = {};
  if (input.name !== undefined) patch.name = input.name;
  if (input.location !== undefined) patch.location = input.location;
  if (input.categories !== undefined) patch.categories = input.categories;

  const { data, error } = await supabase
    .from("vendors")
    .update(patch)
    .eq("id", vendorId)
    .select("*")
    .single();

  if (error) throw error;
  return toVendor(data);
}

export async function createVendor(input: CreateVendorInput): Promise<Vendor> {
  const { data, error } = await supabase
    .from("vendors")
    .insert({
      owner_firebase_uid: input.ownerFirebaseUid,
      name: input.name,
      location: input.location,
      categories: input.categories,
      plan: input.plan,
    })
    .select("*")
    .single();

  if (error) throw error;
  return toVendor(data);
}
