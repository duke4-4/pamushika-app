export type UserType = "consumer" | "vendor";

const consumerRoutes: Record<string, string> = {
  home: "Home",
  search: "Search",
  favorites: "Favorites",
  profile: "Profile",
};

const vendorRoutes: Record<string, string> = {
  "vendor-dashboard": "VendorDashboard",
  "vendor-products": "VendorProducts",
  "vendor-posts": "VendorPosts",
  profile: "Profile",
};

export function navigateToTab(navigation: any, tab: string, userType: UserType = "consumer") {
  const routes = userType === "vendor" ? vendorRoutes : consumerRoutes;
  const route = routes[tab];

  if (!route) return;

  if (route === "Profile") {
    navigation.navigate(route, { userType });
    return;
  }

  navigation.navigate(route);
}
