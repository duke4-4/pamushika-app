import { supabase } from "../lib/supabase";
import { Product } from "../types/marketplace";

function toProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: `$${Number(row.price).toFixed(2)}`,
    unit: row.unit,
    vendorId: row.vendor_id,
    vendorName: row.vendors?.name ?? "",
    rating: Number(row.rating),
    inStock: row.in_stock,
    image: row.image_url ?? "",
    description: row.description ?? "",
    nutrition: {
      vitamins: row.nutrition?.vitamins ?? [],
      minerals: row.nutrition?.minerals ?? [],
      protein: row.nutrition?.protein ?? "",
      fiber: row.nutrition?.fiber ?? "",
    },
    benefits: row.benefits ?? [],
  };
}

const PRODUCT_SELECT = "*, vendors(name)";

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function fetchProductsByVendor(vendorId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(toProduct);
}
