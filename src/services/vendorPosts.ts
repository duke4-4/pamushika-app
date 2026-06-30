import { supabase } from "../lib/supabase";
import { VendorPost } from "../types/marketplace";

function formatPostDate(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round((startOfDay(today) - startOfDay(date)) / 86_400_000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays > 1 && diffDays < 7) return date.toLocaleDateString(undefined, { weekday: "short" });
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function toVendorPost(row: any): VendorPost {
  return {
    id: row.id,
    vendorId: row.vendor_id,
    productId: row.product_id,
    title: row.title,
    body: row.body,
    views: String(row.views),
    replies: String(row.replies),
    date: formatPostDate(row.created_at),
    productImage: row.products?.image_url ?? "",
    productCategory: row.products?.category ?? "",
  };
}

export async function fetchVendorPosts(vendorId: string): Promise<VendorPost[]> {
  const { data, error } = await supabase
    .from("vendor_posts")
    .select("*, products(image_url, category)")
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(toVendorPost);
}
