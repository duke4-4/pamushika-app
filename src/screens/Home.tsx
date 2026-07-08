import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Apple, Bell, ChevronRight, Leaf, LayoutGrid, MapPin, Shield, Sparkles, Sprout, Star, User, Wheat } from "lucide-react-native";
import BottomNav from "../components/BottomNav";
import HealthyTipsCarousel from "../components/HealthyTipsCarousel";
import { SkeletonList } from "../components/LoadingFeedback";
import { navigateToTab } from "../navigation/tabs";
import { useAsync } from "../hooks/useAsync";
import { fetchVendors } from "../services/vendors";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = [
  { name: "All",        Icon: LayoutGrid },
  { name: "Fruits",     Icon: Apple },
  { name: "Vegetables", Icon: Leaf },
  { name: "Indigenous", Icon: Wheat },
  { name: "Organic",    Icon: Sprout },
];

export default function Home({ navigation }: any) {
  const { profile } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: vendors, loading } = useAsync(fetchVendors, []);

  const displayedVendors = (vendors ?? []).slice(0, 6).filter((v) => {
    if (activeCategory === "All") return true;
    return v.categories.some((c) =>
      c.toLowerCase().includes(activeCategory.toLowerCase())
    );
  });

  const location = profile?.location ?? "Zimbabwe";

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <SafeAreaView edges={["top"]} className="bg-green-700 px-4 pt-4 pb-5">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <View className="flex-row items-center gap-1 mb-1">
                <MapPin width={12} height={12} color="#bbf7d0" />
                <Text className="text-green-200 text-xs">{location}</Text>
              </View>
              <Text className="text-2xl font-extrabold text-white tracking-tight">PAMUSHIKA IN</Text>
              <Text className="text-green-200 text-xs mt-0.5">Fresh produce at your doorstep</Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 bg-white/15 rounded-full items-center justify-center border border-white/20">
                <Bell width={20} height={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToTab(navigation, "profile")}
                className="w-10 h-10 bg-white/15 rounded-full items-center justify-center border border-white/20"
              >
                <User width={20} height={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search bar */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            className="bg-white rounded-2xl px-4 py-3.5 flex-row items-center gap-3 shadow-lg"
            activeOpacity={0.9}
          >
            <Sparkles width={20} height={20} color="#9ca3af" />
            <Text className="text-gray-400 flex-1 text-sm">Search for fresh produce...</Text>
            <View className="w-8 h-8 bg-green-600 rounded-xl items-center justify-center">
              <Sparkles width={16} height={16} color="white" />
            </View>
          </TouchableOpacity>
        </SafeAreaView>

        {/* Category pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="bg-white shadow-sm"
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        >
          <View className="flex-row gap-2">
            {CATEGORIES.map(({ name, Icon }) => {
              const active = activeCategory === name;
              return (
                <TouchableOpacity
                  key={name}
                  onPress={() => setActiveCategory(name)}
                  className={`flex-row items-center gap-1.5 px-4 py-2 rounded-full ${
                    active ? "bg-green-600 shadow-md" : "bg-gray-100"
                  }`}
                  activeOpacity={0.8}
                >
                  <Icon width={14} height={14} color={active ? "white" : "#4b5563"} />
                  <Text className={`text-sm font-semibold ${active ? "text-white" : "text-gray-600"}`}>{name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Daily health tips */}
        <View className="px-4 py-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-bold text-gray-900">Daily Health Tips</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("HealthyLiving")}
              className="flex-row items-center gap-0.5"
            >
              <Text className="text-xs text-green-600 font-semibold">See all</Text>
              <ChevronRight width={14} height={14} color="#16a34a" />
            </TouchableOpacity>
          </View>
          <HealthyTipsCarousel />
        </View>

        {/* Quick actions */}
        <View className="px-4 pb-4 flex-row gap-3">
          <TouchableOpacity
            onPress={() => Alert.alert("Coming soon", "Nearby vendor map is in Phase 3 (Mapbox).")}
            className="flex-1 bg-green-600 p-4 rounded-2xl items-center shadow-md overflow-hidden"
            activeOpacity={0.85}
          >
            <MapPin width={26} height={26} color="white" />
            <Text className="text-xs font-semibold text-white text-center mt-2">Find{"\n"}Vendors</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("HealthyLiving")}
            className="flex-1 bg-yellow-400 p-4 rounded-2xl items-center shadow-md overflow-hidden"
            activeOpacity={0.85}
          >
            <Leaf width={26} height={26} color="white" />
            <Text className="text-xs font-semibold text-white text-center mt-2">Healthy{"\n"}Living</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToTab(navigation, "favorites")}
            className="flex-1 bg-red-500 p-4 rounded-2xl items-center shadow-md overflow-hidden"
            activeOpacity={0.85}
          >
            <Star width={26} height={26} color="white" />
            <Text className="text-xs font-semibold text-white text-center mt-2">My{"\n"}Favorites</Text>
          </TouchableOpacity>
        </View>

        {/* Vendors */}
        <View className="px-4 flex-1 pb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-bold text-lg text-gray-900">Vendors Near You</Text>
            <TouchableOpacity
              onPress={() => Alert.alert("Coming soon", "Map view is in Phase 3 (Mapbox).")}
              className="flex-row items-center gap-0.5"
            >
              <Text className="text-xs text-green-600 font-semibold">View map</Text>
              <ChevronRight width={14} height={14} color="#16a34a" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <SkeletonList rows={3} />
          ) : displayedVendors.length === 0 ? (
            <View className="bg-white rounded-2xl p-8 items-center shadow-sm">
              <Text className="text-gray-400 text-sm">No vendors in this category yet</Text>
            </View>
          ) : (
            <View className="gap-3">
              {displayedVendors.map((vendor) => (
                <TouchableOpacity
                  key={vendor.id}
                  onPress={() => navigation.navigate("VendorProfile", { vendorId: vendor.id })}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  activeOpacity={0.85}
                >
                  <View className="flex-row gap-3">
                    <View className="w-14 h-14 bg-green-600 rounded-2xl items-center justify-center shadow-md">
                      <Text className="text-white text-xl font-bold">{vendor.name.charAt(0)}</Text>
                    </View>

                    <View className="flex-1">
                      <View className="flex-row items-center gap-1.5 mb-0.5">
                        <Text className="font-bold text-gray-900 flex-1 text-sm" numberOfLines={1}>{vendor.name}</Text>
                        {vendor.verified && <Shield width={14} height={14} color="#16a34a" fill="#16a34a" />}
                      </View>

                      <View className="flex-row items-center gap-1 mb-2">
                        <MapPin width={12} height={12} color="#6b7280" />
                        <Text className="text-xs text-gray-500 flex-1" numberOfLines={1}>{vendor.location}</Text>
                        {vendor.distance && (
                          <>
                            <Text className="text-xs text-gray-300 mx-1">|</Text>
                            <Text className="text-xs text-green-600 font-semibold">{vendor.distance}</Text>
                          </>
                        )}
                      </View>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-1">
                          <Star width={14} height={14} color="#facc15" fill="#facc15" />
                          <Text className="font-bold text-xs text-gray-800">{vendor.rating}</Text>
                          <Text className="text-xs text-gray-400">({vendor.reviewCount})</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row gap-1.5 mt-3 flex-wrap">
                    {vendor.categories.slice(0, 3).map((cat) => (
                      <View key={cat} className="px-2.5 py-1 bg-green-50 rounded-full">
                        <Text className="text-green-700 text-xs font-medium">{cat}</Text>
                      </View>
                    ))}
                    {vendor.categories.length > 3 && (
                      <View className="px-2.5 py-1 bg-gray-100 rounded-full">
                        <Text className="text-gray-500 text-xs font-medium">+{vendor.categories.length - 3}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <BottomNav activeTab="home" onNavigate={(tab) => navigateToTab(navigation, tab)} />
    </View>
  );
}
