export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  vendorId: string;
  vendorName: string;
  distance: string;
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
  distance: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  verified: boolean;
  plan: "Starter" | "Growth" | "Premium";
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Fresh Ginger",
    category: "Herbs & Spices",
    price: "$0.50",
    unit: "per 100g",
    vendorId: "v1",
    vendorName: "Green Market Fresh",
    distance: "0.5 km",
    rating: 4.8,
    inStock: true,
    image: "https://images.unsplash.com/photo-1606854428728-5fe3eea23475?w=400",
    description: "Fresh organic ginger root, perfect for cooking and tea",
    nutrition: {
      vitamins: ["Vitamin C", "Vitamin B6"],
      minerals: ["Potassium", "Magnesium", "Copper"],
      protein: "1.8g",
      fiber: "2.0g",
    },
    benefits: [
      "Supports immunity",
      "Aids digestion",
      "Anti-inflammatory properties",
      "Helps with nausea",
    ],
  },
  {
    id: "2",
    name: "Moringa Leaves",
    category: "Indigenous Foods",
    price: "$2.00",
    unit: "per bunch",
    vendorId: "v2",
    vendorName: "African Heritage Foods",
    distance: "1.2 km",
    rating: 4.9,
    inStock: true,
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400",
    description: "Fresh moringa leaves, a superfood packed with nutrients",
    nutrition: {
      vitamins: ["Vitamin A", "Vitamin C", "Vitamin E"],
      minerals: ["Calcium", "Iron", "Potassium"],
      protein: "9.4g",
      fiber: "2.0g",
    },
    benefits: [
      "Rich in antioxidants",
      "Supports healthy blood sugar levels",
      "Reduces inflammation",
      "Provides essential amino acids",
    ],
  },
  {
    id: "3",
    name: "Sweet Potatoes",
    category: "Vegetables",
    price: "$1.50",
    unit: "per kg",
    vendorId: "v1",
    vendorName: "Green Market Fresh",
    distance: "0.5 km",
    rating: 4.7,
    inStock: true,
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400",
    description: "Orange-fleshed sweet potatoes, rich in beta-carotene",
    nutrition: {
      vitamins: ["Vitamin A", "Vitamin C", "Vitamin B6"],
      minerals: ["Potassium", "Manganese"],
      protein: "2.0g",
      fiber: "3.0g",
    },
    benefits: [
      "Excellent source of beta-carotene",
      "Supports eye health",
      "Regulates blood sugar",
      "High in fiber",
    ],
  },
  {
    id: "4",
    name: "Baobab Fruit",
    category: "Indigenous Foods",
    price: "$3.00",
    unit: "per fruit",
    vendorId: "v2",
    vendorName: "African Heritage Foods",
    distance: "1.2 km",
    rating: 5.0,
    inStock: true,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
    description: "Nutrient-dense baobab fruit, known as the 'Tree of Life'",
    nutrition: {
      vitamins: ["Vitamin C", "Vitamin B6"],
      minerals: ["Calcium", "Potassium", "Magnesium"],
      protein: "2.3g",
      fiber: "50g",
    },
    benefits: [
      "Rich in Vitamin C",
      "Supports gut health",
      "Boosts energy levels",
      "Antioxidant powerhouse",
    ],
  },
  {
    id: "5",
    name: "Fresh Avocados",
    category: "Fruits",
    price: "$0.80",
    unit: "each",
    vendorId: "v3",
    vendorName: "Organic Farm Co.",
    distance: "2.1 km",
    rating: 4.6,
    inStock: true,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400",
    description: "Creamy Hass avocados, perfectly ripe",
    nutrition: {
      vitamins: ["Vitamin K", "Vitamin E", "Vitamin C", "B Vitamins"],
      minerals: ["Potassium", "Magnesium"],
      protein: "2.0g",
      fiber: "6.7g",
    },
    benefits: [
      "Heart-healthy fats",
      "Supports weight management",
      "Rich in nutrients",
      "Improves cholesterol levels",
    ],
  },
  {
    id: "6",
    name: "Pumpkin Leaves",
    category: "Vegetables",
    price: "$1.00",
    unit: "per bunch",
    vendorId: "v1",
    vendorName: "Green Market Fresh",
    distance: "0.5 km",
    rating: 4.5,
    inStock: true,
    image: "https://images.unsplash.com/photo-1591271942183-6d5eca7ff60f?w=400",
    description: "Fresh pumpkin leaves, a staple in African cuisine",
    nutrition: {
      vitamins: ["Vitamin A", "Vitamin C", "Vitamin K"],
      minerals: ["Calcium", "Iron", "Magnesium"],
      protein: "3.5g",
      fiber: "2.3g",
    },
    benefits: [
      "Supports vision health",
      "Strengthens bones",
      "Boosts immune system",
      "Rich in antioxidants",
    ],
  },
  {
    id: "7",
    name: "Fresh Okra",
    category: "Vegetables",
    price: "$1.20",
    unit: "per 500g",
    vendorId: "v3",
    vendorName: "Organic Farm Co.",
    distance: "2.1 km",
    rating: 4.4,
    inStock: true,
    image: "https://images.unsplash.com/photo-1599492812550-27f8aa91fca6?w=400",
    description: "Tender okra pods, fresh from the farm",
    nutrition: {
      vitamins: ["Vitamin C", "Vitamin K", "Folate"],
      minerals: ["Magnesium", "Calcium"],
      protein: "2.0g",
      fiber: "3.2g",
    },
    benefits: [
      "Supports digestive health",
      "Helps control blood sugar",
      "Heart-healthy",
      "Low in calories",
    ],
  },
  {
    id: "8",
    name: "Pearl Millet",
    category: "Grains & Cereals",
    price: "$2.50",
    unit: "per kg",
    vendorId: "v2",
    vendorName: "African Heritage Foods",
    distance: "1.2 km",
    rating: 4.8,
    inStock: true,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    description: "Whole grain pearl millet, gluten-free and nutritious",
    nutrition: {
      vitamins: ["B Vitamins", "Niacin"],
      minerals: ["Iron", "Magnesium", "Phosphorus"],
      protein: "11.0g",
      fiber: "8.5g",
    },
    benefits: [
      "Gluten-free grain",
      "Rich in protein",
      "Supports heart health",
      "Good for diabetics",
    ],
  },
];

export const mockVendors: Vendor[] = [
  {
    id: "v1",
    name: "Green Market Fresh",
    location: "Avondale, Harare",
    distance: "0.5 km",
    rating: 4.8,
    reviewCount: 124,
    categories: ["Fruits", "Vegetables", "Herbs & Spices"],
    verified: true,
    plan: "Premium",
  },
  {
    id: "v2",
    name: "African Heritage Foods",
    location: "Mbare, Harare",
    distance: "1.2 km",
    rating: 4.9,
    reviewCount: 89,
    categories: ["Indigenous Foods", "Grains & Cereals"],
    verified: true,
    plan: "Growth",
  },
  {
    id: "v3",
    name: "Organic Farm Co.",
    location: "Mount Pleasant, Harare",
    distance: "2.1 km",
    rating: 4.6,
    reviewCount: 67,
    categories: ["Fruits", "Vegetables", "Organic Foods"],
    verified: true,
    plan: "Growth",
  },
  {
    id: "v4",
    name: "Local Harvest Market",
    location: "Borrowdale, Harare",
    distance: "3.5 km",
    rating: 4.5,
    reviewCount: 42,
    categories: ["Fruits", "Vegetables"],
    verified: false,
    plan: "Starter",
  },
];

export const healthyLivingContent = [
  {
    id: "1",
    type: "fruit",
    title: "Fruit of the Day: Baobab",
    description: "Known as the 'Tree of Life', baobab fruit is packed with Vitamin C and supports gut health.",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
  },
  {
    id: "2",
    type: "vegetable",
    title: "Vegetable of the Day: Pumpkin Leaves",
    description: "A traditional African vegetable rich in vitamins A, C, and K. Perfect for soups and stews.",
    image: "https://images.unsplash.com/photo-1591271942183-6d5eca7ff60f?w=400",
  },
  {
    id: "3",
    type: "indigenous",
    title: "Indigenous Spotlight: Moringa",
    description: "This superfood has been used in African traditional medicine for centuries. It's one of the most nutrient-dense plants.",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400",
  },
  {
    id: "4",
    type: "recipe",
    title: "Healthy Recipe: Moringa Smoothie",
    description: "Blend fresh moringa leaves with banana, mango, and yogurt for a nutritious breakfast.",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400",
  },
  {
    id: "5",
    type: "tip",
    title: "Nutrition Tip",
    description: "Eat a variety of colorful fruits and vegetables daily to ensure you get all essential vitamins and minerals.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
  },
];
