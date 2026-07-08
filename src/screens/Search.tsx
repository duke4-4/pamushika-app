import React, { useMemo, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Filter, MapPin, Search as SearchIcon, SlidersHorizontal, Star } from "lucide-react-native";
import BottomNav from "../components/BottomNav";
import { SkeletonList } from "../components/LoadingFeedback";
import { useAsync } from "../hooks/useAsync";
import { fetchProducts } from "../services/products";
import { navigateToTab } from "../navigation/tabs";

const categories = ["All", "Fruits", "Vegetables", "Indigenous Foods", "Organic Foods"];

export default function Search({ navigation }: any) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: allProducts, loading } = useAsync(fetchProducts, []);

  const products = useMemo(() => {
    return (allProducts ?? []).filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.vendorName.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [allProducts, query, selectedCategory]);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 110 }}>
        <SafeAreaView edges={["top"]} className="bg-green-600 px-4 pt-5 pb-5">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-2xl font-bold text-white">Search Market</Text>
              <Text className="text-green-100 text-sm mt-1">Fresh produce from nearby vendors</Text>
            </View>
            <TouchableOpacity className="w-11 h-11 rounded-full bg-white/20 items-center justify-center">
              <SlidersHorizontal width={20} height={20} color="white" />
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl px-4 py-3 flex-row items-center gap-3 shadow-md">
            <SearchIcon width={20} height={20} color="#9ca3af" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search fruits, vegetables, vendors..."
              placeholderTextColor="#9ca3af"
              className="flex-1 text-sm text-gray-900"
            />
          </View>
        </SafeAreaView>

        <View className="bg-white border-b border-gray-100">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}>
            <View className="flex-row gap-2">
              {categories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 rounded-full border ${
                      active ? "bg-green-600 border-green-600" : "bg-white border-gray-200"
                    }`}
                  >
                    <Text className={`text-sm font-medium ${active ? "text-white" : "text-gray-600"}`}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View className="px-4 py-5">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-900">{products.length} results nearby</Text>
            <TouchableOpacity className="flex-row items-center gap-1.5 px-3 py-2 bg-green-50 rounded-full">
              <Filter width={15} height={15} color="#16a34a" />
              <Text className="text-green-700 text-xs font-semibold">Filters</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <SkeletonList rows={4} />
          ) : (
          <View className="gap-3">
            {products.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => navigation.navigate("ProductDetails", { productId: product.id })}
                activeOpacity={0.86}
                className="bg-white rounded-2xl p-3 shadow-sm"
              >
                <View className="flex-row gap-3">
                  <Image source={{ uri: product.image }} className="w-24 h-24 rounded-xl bg-gray-100" />
                  <View className="flex-1">
                    <View className="flex-row items-start justify-between gap-2">
                      <Text className="font-bold text-gray-900 flex-1" numberOfLines={1}>{product.name}</Text>
                      <Text className="font-bold text-green-600">{product.price}</Text>
                    </View>
                    <Text className="text-xs text-gray-500 mt-1">{product.unit}</Text>
                    <Text className="text-sm text-gray-700 mt-2" numberOfLines={2}>{product.description}</Text>
                    <View className="flex-row items-center justify-between mt-3">
                      {product.distance ? (
                        <View className="flex-row items-center gap-1">
                          <MapPin width={13} height={13} color="#6b7280" />
                          <Text className="text-xs text-gray-500">{product.distance}</Text>
                        </View>
                      ) : <View />}
                      <View className="flex-row items-center gap-1">
                        <Star width={14} height={14} color="#facc15" fill="#facc15" />
                        <Text className="text-xs font-semibold text-gray-800">{product.rating}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <Text className="text-xs text-gray-500" numberOfLines={1}>{product.vendorName}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("VendorProfile", { vendorId: product.vendorId })}
                    className="px-3 py-1.5 bg-green-600 rounded-full"
                  >
                    <Text className="text-white text-xs font-semibold">Contact</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          )}
        </View>
      </ScrollView>

      <BottomNav activeTab="search" onNavigate={(tab) => navigateToTab(navigation, tab)} />
    </View>
  );
}
