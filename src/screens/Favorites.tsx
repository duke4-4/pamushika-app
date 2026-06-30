import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heart, MapPin, Phone, Shield, Star } from "lucide-react-native";
import BottomNav from "../components/BottomNav";
import { SkeletonList } from "../components/LoadingFeedback";
import { useAsync } from "../hooks/useAsync";
import { fetchProducts } from "../services/products";
import { fetchVendors } from "../services/vendors";
import { navigateToTab } from "../navigation/tabs";

// TODO(Phase 2): scope these to the signed-in user's actual saved items once
// Firebase Auth exists. For now this just shows live catalog data so the
// screen isn't stuck on static mocks; the heart toggle isn't wired up yet.
export default function Favorites({ navigation }: any) {
  const [mode, setMode] = useState<"products" | "vendors">("products");
  const { data: products, loading: productsLoading } = useAsync(fetchProducts, []);
  const { data: vendors, loading: vendorsLoading } = useAsync(fetchVendors, []);
  const favoriteProducts = (products ?? []).slice(0, 4);
  const favoriteVendors = (vendors ?? []).slice(0, 3);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 110 }}>
        <SafeAreaView edges={["top"]} className="bg-green-600 px-4 pt-5 pb-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-white">Favorites</Text>
              <Text className="text-green-100 text-sm mt-1">Saved vendors and produce</Text>
            </View>
            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
              <Heart width={22} height={22} color="white" fill="white" />
            </View>
          </View>
        </SafeAreaView>

        <View className="px-4 -mt-5">
          <View className="bg-white rounded-2xl p-1 flex-row shadow-sm">
            <TouchableOpacity
              onPress={() => setMode("products")}
              className={`flex-1 py-3 rounded-xl items-center ${mode === "products" ? "bg-green-600" : ""}`}
            >
              <Text className={`text-sm font-semibold ${mode === "products" ? "text-white" : "text-gray-500"}`}>
                Products
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode("vendors")}
              className={`flex-1 py-3 rounded-xl items-center ${mode === "vendors" ? "bg-green-600" : ""}`}
            >
              <Text className={`text-sm font-semibold ${mode === "vendors" ? "text-white" : "text-gray-500"}`}>
                Vendors
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {mode === "products" ? (
          productsLoading ? (
            <View className="px-4 py-5"><SkeletonList rows={4} /></View>
          ) : (
          <View className="px-4 py-5 gap-3">
            {favoriteProducts.map((product) => (
              <TouchableOpacity key={product.id} activeOpacity={0.86} className="bg-white rounded-2xl p-3 shadow-sm">
                <View className="flex-row gap-3">
                  <Image source={{ uri: product.image }} className="w-24 h-24 rounded-xl bg-gray-100" />
                  <View className="flex-1">
                    <View className="flex-row items-start justify-between gap-2">
                      <Text className="font-bold text-gray-900 flex-1" numberOfLines={1}>{product.name}</Text>
                      <Heart width={19} height={19} color="#dc2626" fill="#dc2626" />
                    </View>
                    <Text className="text-xs text-gray-500 mt-1">{product.category}</Text>
                    <Text className="text-sm text-gray-700 mt-2" numberOfLines={2}>{product.description}</Text>
                    <View className="flex-row items-center justify-between mt-3">
                      <Text className="font-bold text-green-600">{product.price} <Text className="text-xs text-gray-500 font-normal">{product.unit}</Text></Text>
                      <View className="flex-row items-center gap-1">
                        <Star width={14} height={14} color="#facc15" />
                        <Text className="text-xs font-semibold text-gray-800">{product.rating}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          )
        ) : vendorsLoading ? (
          <View className="px-4 py-5"><SkeletonList rows={3} /></View>
        ) : (
          <View className="px-4 py-5 gap-3">
            {favoriteVendors.map((vendor) => (
              <TouchableOpacity key={vendor.id} activeOpacity={0.86} className="bg-white rounded-2xl p-4 shadow-sm">
                <View className="flex-row gap-4">
                  <View className="w-16 h-16 bg-green-500 rounded-2xl items-center justify-center">
                    <Text className="text-white text-2xl font-bold">{vendor.name.charAt(0)}</Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text className="font-bold text-gray-900 flex-1" numberOfLines={1}>{vendor.name}</Text>
                      {vendor.verified && <Shield width={16} height={16} color="#16a34a" />}
                    </View>
                    <View className="flex-row items-center gap-1 mt-1">
                      <MapPin width={13} height={13} color="#6b7280" />
                      <Text className="text-xs text-gray-500 flex-1" numberOfLines={1}>{vendor.location}</Text>
                    </View>
                    <View className="flex-row items-center justify-between mt-3">
                      <View className="flex-row items-center gap-1">
                        <Star width={14} height={14} color="#facc15" />
                        <Text className="text-xs font-semibold text-gray-800">{vendor.rating}</Text>
                        <Text className="text-xs text-gray-500">({vendor.reviewCount})</Text>
                      </View>
                      <TouchableOpacity className="flex-row items-center gap-1.5 px-3 py-1.5 bg-green-600 rounded-full">
                        <Phone width={13} height={13} color="white" />
                        <Text className="text-white text-xs font-semibold">Call</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNav activeTab="favorites" onNavigate={(tab) => navigateToTab(navigation, tab)} />
    </View>
  );
}
