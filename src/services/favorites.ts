import { supabase } from "../lib/supabase";
import { Product } from "../types/marketplace";
import { Vendor } from "../types/marketplace";

function toProductFromFav(row: any): Product {
  const p = row.products;
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    price: `$${Number(p.price).toFixed(2)}`,
    unit: p.unit,
    vendorId: p.vendor_id,
    vendorName: p.vendors?.name ?? "",
    rating: Number(p.rating),
    inStock: p.in_stock,
    image: p.image_url ?? "",
    description: p.description ?? "",
    nutrition: {
      vitamins: p.nutrition?.vitamins ?? [],
      minerals: p.nutrition?.minerals ?? [],
      protein: p.nutrition?.protein ?? "",
      fiber: p.nutrition?.fiber ?? "",
    },
    benefits: p.benefits ?? [],
  };
}

function toVendorFromFav(row: any): Vendor {
  const v = row.vendors;
  return {
    id: v.id,
    name: v.name,
    location: v.location,
    rating: Number(v.rating),
    reviewCount: v.review_count,
    categories: v.categories ?? [],
    verified: v.verified,
    plan: v.plan,
  };
}

export async function fetchFavoriteProducts(firebaseUid: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("user_favorites")
    .select("products(*, vendors(name))")
    .eq("firebase_uid", firebaseUid)
    .not("product_id", "is", null);
  if (error) throw error;
  return (data ?? []).filter((r: any) => r.products).map(toProductFromFav);
}

export async function fetchFavoriteVendors(firebaseUid: string): Promise<Vendor[]> {
  const { data, error } = await supabase
    .from("user_favorites")
    .select("vendors(*)")
    .eq("firebase_uid", firebaseUid)
    .not("vendor_id", "is", null);
  if (error) throw error;
  return (data ?? []).filter((r: any) => r.vendors).map(toVendorFromFav);
}

export async function fetchFavoriteProductIds(firebaseUid: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("user_favorites")
    .select("product_id")
    .eq("firebase_uid", firebaseUid)
    .not("product_id", "is", null);
  if (error) throw error;
  return (data ?? []).map((r: any) => r.product_id as string);
}

export async function fetchFavoriteVendorIds(firebaseUid: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("user_favorites")
    .select("vendor_id")
    .eq("firebase_uid", firebaseUid)
    .not("vendor_id", "is", null);
  if (error) throw error;
  return (data ?? []).map((r: any) => r.vendor_id as string);
}

export async function toggleProductFavorite(
  firebaseUid: string,
  productId: string,
  currentlyFavorited: boolean
): Promise<void> {
  if (currentlyFavorited) {
    const { error } = await supabase
      .from("user_favorites")
      .delete()
      .eq("firebase_uid", firebaseUid)
      .eq("product_id", productId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("user_favorites")
      .insert({ firebase_uid: firebaseUid, product_id: productId });
    if (error) throw error;
  }
}

export async function toggleVendorFavorite(
  firebaseUid: string,
  vendorId: string,
  currentlyFavorited: boolean
): Promise<void> {
  if (currentlyFavorited) {
    const { error } = await supabase
      .from("user_favorites")
      .delete()
      .eq("firebase_uid", firebaseUid)
      .eq("vendor_id", vendorId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("user_favorites")
      .insert({ firebase_uid: firebaseUid, vendor_id: vendorId });
    if (error) throw error;
  }
}
