import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, MapPin, Leaf, Bell, Star, Shield, Phone, User } from "lucide-react-native";
import BottomNav from "../components/BottomNav";
import HealthyTipsCarousel from "../components/HealthyTipsCarousel";
import { SkeletonList } from "../components/LoadingFeedback";
import { navigateToTab } from "../navigation/tabs";
import { useAsync } from "../hooks/useAsync";
import { fetchVendors } from "../services/vendors";

export default function Home({ navigation }: any) {
  const { data: vendors, loading } = useAsync(fetchVendors, []);
  const nearbyVendors = (vendors ?? []).slice(0, 6);

  const categories = [
    { name: "All", icon: "🌿" },
    { name: "Fruits", icon: "🍎" },
    { name: "Vegetables", icon: "🥬" },
    { name: "Indigenous", icon: "🌾" },
    { name: "Organic", icon: "🌱" },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <SafeAreaView edges={['top']} className="bg-green-600 px-4 pt-5 pb-4">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-xl font-bold text-white">PAMUSHIKA IN</Text>
              <View className="flex-row items-center gap-1 mt-1">
                <MapPin width={14} height={14} color="#dcfce7" />
                <Text className="text-green-100 text-xs">Harare, Zimbabwe</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => {}}
              className="w-11 h-11 bg-white/20 rounded-full items-center justify-center"
            >
              <User width={20} height={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <TouchableOpacity 
            className="bg-white rounded-xl px-4 py-3.5 flex-row items-center gap-3 shadow-md"
            activeOpacity={0.9}
          >
            <Search width={20} height={20} color="#9ca3af" />
            <Text className="text-gray-400 flex-1 text-sm">Search for fresh produce...</Text>
          </TouchableOpacity>
        </SafeAreaView>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white px-4 py-3 border-b border-gray-100">
          <View className="flex-row gap-2 pr-6">
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                className="px-4 py-2.5 rounded-full bg-green-600 shadow-sm flex-row items-center"
              >
                <Text className="mr-1.5">{cat.icon}</Text>
                <Text className="text-white text-sm font-medium">{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Healthy Tips Carousel */}
        <View className="px-4 py-4">
          <Text className="text-sm font-bold text-gray-900 mb-3">Daily Healthy Tips</Text>
          <HealthyTipsCarousel />
        </View>

        {/* Quick Actions */}
        <View className="px-4 pb-4 flex-row gap-3">
          <TouchableOpacity className="flex-1 bg-green-500 p-4 rounded-2xl items-center shadow-md">
            <MapPin width={28} height={28} color="white" className="mb-2" />
            <Text className="text-xs font-medium text-white text-center">Nearby{"\n"}Vendors</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-yellow-400 p-4 rounded-2xl items-center shadow-md">
            <Leaf width={28} height={28} color="white" className="mb-2" />
            <Text className="text-xs font-medium text-white text-center">Healthy{"\n"}Living</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-red-500 p-4 rounded-2xl items-center shadow-md">
            <Bell width={28} height={28} color="white" className="mb-2" />
            <Text className="text-xs font-medium text-white text-center">Notifications</Text>
          </TouchableOpacity>
        </View>

        {/* Vendors */}
        <View className="px-4 bg-gray-50 flex-1 pb-4">
          <View className="flex-row items-center justify-between mb-3 pt-2">
            <Text className="text-lg font-bold text-gray-900">Vendors Near You</Text>
            <TouchableOpacity>
              <Text className="text-sm text-green-600 font-semibold">View Map</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <SkeletonList rows={3} />
          ) : (
          <View className="gap-3">
            {nearbyVendors.map((vendor) => (
              <TouchableOpacity
                key={vendor.id}
                className="bg-white rounded-2xl p-4 shadow-sm"
                activeOpacity={0.8}
              >
                <View className="flex-row gap-4">
                  <View className="w-16 h-16 bg-green-500 rounded-2xl items-center justify-center shadow-md">
                    <Text className="text-white text-2xl font-bold">{vendor.name.charAt(0)}</Text>
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-1">
                      <Text className="font-bold text-gray-900 flex-1" numberOfLines={1}>{vendor.name}</Text>
                      {vendor.verified && (
                        <Shield width={16} height={16} color="#16a34a" />
                      )}
                    </View>

                    <View className="flex-row items-center gap-1 mb-2">
                      <MapPin width={14} height={14} color="#6b7280" />
                      <Text className="text-xs text-gray-500" numberOfLines={1}>{vendor.location}</Text>
                      {vendor.distance && (
                        <>
                          <Text className="text-xs text-gray-400">•</Text>
                          <Text className="text-xs text-green-600 font-medium">{vendor.distance}</Text>
                        </>
                      )}
                    </View>

                    <View className="flex-row items-center justify-between mt-1">
                      <View className="flex-row items-center gap-1">
                        <Star width={16} height={16} color="#facc15" />
                        <Text className="font-semibold text-sm">{vendor.rating}</Text>
                        <Text className="text-xs text-gray-500">({vendor.reviewCount})</Text>
                      </View>

                      <TouchableOpacity className="flex-row items-center gap-1.5 px-3 py-1.5 bg-green-600 rounded-full">
                        <Phone width={14} height={14} color="white" />
                        <Text className="text-white text-xs font-medium">Contact</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View className="flex-row gap-2 mt-3 flex-wrap">
                  {vendor.categories.slice(0, 3).map((category) => (
                    <View
                      key={category}
                      className="px-2.5 py-1 bg-green-50 rounded-full"
                    >
                      <Text className="text-green-700 text-xs font-medium">{category}</Text>
                    </View>
                  ))}
                  {vendor.categories.length > 3 && (
                    <View className="px-2.5 py-1 bg-gray-100 rounded-full">
                      <Text className="text-gray-600 text-xs font-medium">
                        +{vendor.categories.length - 3}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab="home"
        onNavigate={(tab) => navigateToTab(navigation, tab)}
      />
    </View>
  );
}
