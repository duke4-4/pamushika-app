import React from "react";
import { Alert, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertTriangle, Bell, Clock, Crown, DollarSign, Eye, MapPin, Package, Settings, ShoppingBag, Star, Users } from "lucide-react-native";
import BottomNav from "../components/BottomNav";
import { navigateToTab } from "../navigation/tabs";
import { useAuth } from "../context/AuthContext";
import { useAsync } from "../hooks/useAsync";
import { fetchVendorByOwner } from "../services/vendors";
import { fetchProductCountByVendor } from "../services/products";

export default function VendorDashboard({ navigation }: any) {
  const { user, profile } = useAuth();
  const { data: vendor } = useAsync(
    () => (user ? fetchVendorByOwner(user.uid) : Promise.resolve(null)),
    [user?.uid]
  );
  const { data: productCount } = useAsync(
    () => (vendor ? fetchProductCountByVendor(vendor.id) : Promise.resolve(0)),
    [vendor?.id]
  );

  const stats = [
    { label: "Products", value: productCount != null ? String(productCount) : "—", icon: Package, bg: "bg-green-100", iconColor: "#16a34a" },
    { label: "Revenue", value: "—", icon: DollarSign, bg: "bg-yellow-100", iconColor: "#ca8a04" },
    { label: "Rating", value: vendor ? String(vendor.rating) : "—", icon: Star, bg: "bg-red-100", iconColor: "#dc2626" },
    { label: "Views", value: "—", icon: Eye, bg: "bg-blue-100", iconColor: "#2563eb" },
  ];

  const isPremium = vendor?.plan === "Premium";
  const status = vendor?.subscriptionStatus;
  const trialEndsAt = vendor?.trialEndsAt;

  const trialDaysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / 86_400_000))
    : null;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <SafeAreaView edges={["top"]} className="bg-green-600 px-4 pt-6 pb-6 shadow-lg">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-2xl font-bold text-white">Dashboard</Text>
              <Text className="text-green-100 text-sm mt-1">{vendor?.name ?? profile?.fullName ?? ""}</Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Bell width={20} height={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
                className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
              >
                <Settings width={20} height={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats grid */}
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {stats.map((stat, index) => {
              const IconComp = stat.icon;
              return (
                <View key={index} className="w-[48%] bg-white/15 rounded-2xl p-4">
                  <View className="w-10 h-10 rounded-xl bg-white/20 items-center justify-center mb-2">
                    <IconComp width={20} height={20} color="white" />
                  </View>
                  <Text className="text-2xl font-bold text-white">{stat.value}</Text>
                  <Text className="text-sm text-green-50 mt-1">{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </SafeAreaView>

        <View className="px-4 py-5 gap-5">
          {/* Trial expiry banner */}
          {status === "expired" && (
            <TouchableOpacity
              onPress={() => Alert.alert("Subscription expired", "Your free trial has ended. Paynow payment integration is coming in Phase 4 — contact us at pamushikain@gmail.com to pay manually for now.")}
              className="bg-red-500 rounded-2xl p-4 flex-row items-center gap-3"
              activeOpacity={0.85}
            >
              <View className="w-12 h-12 bg-white/20 rounded-xl items-center justify-center">
                <AlertTriangle width={24} height={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-white">Trial Expired</Text>
                <Text className="text-xs text-red-100 mt-0.5">Your listing is paused — tap to reactivate</Text>
              </View>
              <View className="px-3 py-1.5 bg-white rounded-full">
                <Text className="text-red-600 text-xs font-bold">Pay Now</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Active trial countdown */}
          {status === "trial" && trialDaysLeft !== null && (
            <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex-row items-center gap-3">
              <View className="w-12 h-12 bg-blue-500 rounded-xl items-center justify-center">
                <Clock width={24} height={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-blue-900">Free Trial Active</Text>
                <Text className="text-xs text-blue-600 mt-0.5">
                  {trialDaysLeft > 0
                    ? `${trialDaysLeft} day${trialDaysLeft === 1 ? "" : "s"} remaining — we'll SMS you when it ends`
                    : "Trial ends today — check your SMS for payment instructions"}
                </Text>
              </View>
            </View>
          )}

          {/* Upgrade banner (only for active, non-Premium vendors) */}
          {status === "active" && !isPremium && (
            <TouchableOpacity
              onPress={() => Alert.alert("Upgrade to Premium", "Premium plan ($15/month) with priority listing and analytics is coming in Phase 4.")}
              className="bg-yellow-400 rounded-2xl p-4 flex-row items-center gap-3"
              activeOpacity={0.85}
            >
              <View className="w-12 h-12 bg-white/20 rounded-xl items-center justify-center">
                <Crown width={24} height={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-white">Upgrade to Premium</Text>
                <Text className="text-xs text-yellow-100 mt-0.5">$15/month — featured listing + analytics</Text>
              </View>
              <View className="px-3 py-1.5 bg-white rounded-full">
                <Text className="text-yellow-600 text-xs font-bold">Upgrade</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Quick Actions */}
          <View>
            <Text className="font-bold text-lg mb-4 text-gray-900">Quick Actions</Text>
            <View className="flex-row flex-wrap justify-between gap-y-3">
              <TouchableOpacity
                onPress={() => navigateToTab(navigation, "vendor-products", "vendor")}
                className="w-[48%] bg-white p-5 rounded-2xl shadow-sm"
                activeOpacity={0.85}
              >
                <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center mb-3">
                  <Package width={24} height={24} color="#16a34a" />
                </View>
                <Text className="font-semibold text-gray-900">Products</Text>
                <Text className="text-xs text-gray-500 mt-1">
                  {productCount != null ? `${productCount} listed` : "Manage listing"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Alert.alert("Coming soon", "Orders management is in a future phase.")}
                className="w-[48%] bg-white p-5 rounded-2xl shadow-sm"
                activeOpacity={0.85}
              >
                <View className="w-12 h-12 bg-yellow-100 rounded-xl items-center justify-center mb-3">
                  <ShoppingBag width={24} height={24} color="#ca8a04" />
                </View>
                <Text className="font-semibold text-gray-900">Orders</Text>
                <Text className="text-xs text-gray-500 mt-1">Coming soon</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Alert.alert("Coming soon", "Customer insights are in a future phase.")}
                className="w-[48%] bg-white p-5 rounded-2xl shadow-sm"
                activeOpacity={0.85}
              >
                <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mb-3">
                  <Users width={24} height={24} color="#2563eb" />
                </View>
                <Text className="font-semibold text-gray-900">Customers</Text>
                <Text className="text-xs text-gray-500 mt-1">View insights</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
                className="w-[48%] bg-white p-5 rounded-2xl shadow-sm"
                activeOpacity={0.85}
              >
                <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mb-3">
                  <MapPin width={24} height={24} color="#9333ea" />
                </View>
                <Text className="font-semibold text-gray-900">Location</Text>
                <Text className="text-xs text-gray-500 mt-1">Update address</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Orders — empty state until orders table exists */}
          <View className="bg-white rounded-2xl border border-gray-100 p-5">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="font-bold text-gray-900">Recent Orders</Text>
            </View>
            <View className="items-center py-8">
              <ShoppingBag width={36} height={36} color="#d1d5db" />
              <Text className="text-gray-400 text-sm mt-3">No orders yet</Text>
              <Text className="text-gray-300 text-xs mt-1 text-center">
                Orders will appear here once customers contact you
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNav
        activeTab="vendor-dashboard"
        onNavigate={(tab) => navigateToTab(navigation, tab, "vendor")}
        userType="vendor"
      />
    </View>
  );
}
