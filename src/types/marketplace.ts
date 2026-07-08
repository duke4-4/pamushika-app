export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  vendorId: string;
  vendorName: string;
  distance?: string;
  rating: number;
  inStock: boolean;
  image: string;
  description: string;
  nutrition: {
    vitamins: string[];
    minerals: string[];
    protein: string;
    fiber: string;
  };
  benefits: string[];
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  distance?: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  verified: boolean;
  plan: "Starter" | "Growth" | "Premium";
  subscriptionStatus?: "trial" | "active" | "expired" | "cancelled";
  trialEndsAt?: string | null;
}

export interface VendorPost {
  id: string;
  vendorId: string;
  productId: string | null;
  title: string;
  body: string;
  views: string;
  replies: string;
  date: string;
  productImage: string;
  productCategory: string;
}

export interface HealthyTip {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
}
