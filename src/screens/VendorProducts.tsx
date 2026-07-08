import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Edit3, Package, Plus, Search, TrendingUp } from "lucide-react-native";
import BottomNav from "../components/BottomNav";
import { SkeletonList } from "../components/LoadingFeedback";
import { useAsync } from "../hooks/useAsync";
import { fetchProductsByVendor } from "../services/products";
import { fetchVendorByOwner } from "../services/vendors";
import { useAuth } from "../context/AuthContext";
import { navigateToTab } from "../navigation/tabs";

export default function VendorProducts({ navigation }: any) {
  const { user } = useAuth();
  const { data: vendor } = useAsync(
    () => (user ? fetchVendorByOwner(user.uid) : Promise.resolve(null)),
    [user?.uid]
  );
  const { data, loading } = useAsync(
    () => (vendor ? fetchProductsByVendor(vendor.id) : Promise.resolve([])),
    [vendor?.id]
  );
  const products = data ?? [];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 110 }}>
        <SafeAreaView edges={["top"]} className="bg-green-600 px-4 pt-5 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-2xl font-bold text-white">Products</Text>
              <Text className="text-green-100 text-sm mt-1">Manage your market inventory</Text>
            </View>
            <TouchableOpacity className="w-11 h-11 rounded-full bg-white items-center justify-center">
              <Plus width={22} height={22} color="#16a34a" />
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1 bg-white/15 rounded-2xl p-4">
              <Package width={22} height={22} color="white" />
              <Text className="text-2xl font-bold text-white mt-3">{loading ? "…" : products.length}</Text>
              <Text className="text-xs text-green-50 mt-1">Active items</Text>
            </View>
            <View className="flex-1 bg-white/15 rounded-2xl p-4">
              <TrendingUp width={22} height={22} color="white" />
              <Text className="text-2xl font-bold text-white mt-3">—</Text>
              <Text className="text-xs text-green-50 mt-1">Monthly sales</Text>
            </View>
          </View>
        </SafeAreaView>

        <View className="px-4 py-5">
          <View className="bg-white rounded-2xl px-4 py-3 flex-row items-center gap-3 shadow-sm mb-4">
            <Search width={19} height={19} color="#9ca3af" />
            <Text className="text-sm text-gray-400 flex-1">Search inventory</Text>
          </View>

          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">Listed products</Text>
            <TouchableOpacity>
              <Text className="text-sm font-semibold text-green-600">Sort</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <SkeletonList rows={4} />
          ) : (
          <View className="gap-3">
            {products.map((product) => (
              <View key={product.id} className="bg-white rounded-2xl p-3 shadow-sm">
                <View className="flex-row gap-3">
                  <Image source={{ uri: product.image }} className="w-24 h-24 rounded-xl bg-gray-100" />
                  <View className="flex-1">
                    <View className="flex-row items-start justify-between gap-2">
                      <View className="flex-1">
                        <Text className="font-bold text-gray-900" numberOfLines={1}>{product.name}</Text>
                        <Text className="text-xs text-gray-500 mt-1">{product.category}</Text>
                      </View>
                      <TouchableOpacity className="w-9 h-9 rounded-full bg-green-50 items-center justify-center">
                        <Edit3 width={16} height={16} color="#16a34a" />
                      </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center justify-between mt-4">
                      <Text className="font-bold text-green-600">{product.price} <Text className="text-xs text-gray-500 font-normal">{product.unit}</Text></Text>
                      <View className={`px-2.5 py-1 rounded-full ${product.inStock ? "bg-green-50" : "bg-red-50"}`}>
                        <Text className={`text-xs font-semibold ${product.inStock ? "text-green-700" : "text-red-700"}`}>
                          {product.inStock ? "In stock" : "Out"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
          )}
        </View>
      </ScrollView>

      <BottomNav activeTab="vendor-products" userType="vendor" onNavigate={(tab) => navigateToTab(navigation, tab, "vendor")} />
    </View>
  );
}
