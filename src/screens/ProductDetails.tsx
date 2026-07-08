import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Heart, HeartPulse, Leaf, MapPin, Minus, Plus, Star, Store } from "lucide-react-native";
import { SkeletonList } from "../components/LoadingFeedback";
import { useAsync } from "../hooks/useAsync";
import { fetchProductById } from "../services/products";
import { fetchFavoriteProductIds, toggleProductFavorite } from "../services/favorites";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails({ navigation, route }: any) {
  const { productId } = route.params as { productId: string };
  const { user } = useAuth();

  const { data: product, loading } = useAsync(() => fetchProductById(productId), [productId]);
  const { data: favIds } = useAsync(
    () => (user ? fetchFavoriteProductIds(user.uid) : Promise.resolve([])),
    [user?.uid]
  );

  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (favIds) setIsFavorite(favIds.includes(productId));
  }, [favIds, productId]);

  const handleToggleFavorite = async () => {
    if (!user) return;
    const prev = isFavorite;
    setIsFavorite(!prev);
    try {
      await toggleProductFavorite(user.uid, productId, prev);
    } catch {
      setIsFavorite(prev);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
        <View className="px-4 py-4 flex-row items-center border-b border-gray-100">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
            <ArrowLeft width={20} height={20} color="#111827" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-bold text-gray-900">Product Details</Text>
          <View className="w-9" />
        </View>
        <View className="px-4 py-6"><SkeletonList rows={4} /></View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center" edges={["top"]}>
        <Text className="text-gray-400">Product not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 px-4 py-2 bg-green-600 rounded-full">
          <Text className="text-white font-semibold">Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <SafeAreaView edges={["top"]} className="bg-white border-b border-gray-100">
        <View className="px-4 py-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
            <ArrowLeft width={20} height={20} color="#111827" />
          </TouchableOpacity>
          <Text className="font-bold text-gray-900">Product Details</Text>
          <TouchableOpacity onPress={handleToggleFavorite} className="p-2 -mr-2">
            <Heart
              width={22}
              height={22}
              color={isFavorite ? "#dc2626" : "#9ca3af"}
              fill={isFavorite ? "#dc2626" : "none"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Image */}
        <Image
          source={{ uri: product.image }}
          className="w-full bg-gray-100"
          style={{ height: 280 }}
          resizeMode="cover"
        />

        <View className="px-4 py-5 gap-5">
          {/* Title + price */}
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900 mb-1">{product.name}</Text>
              <Text className="text-gray-500">{product.category}</Text>
            </View>
            <View className="items-end">
              <Text className="text-2xl font-bold text-green-600">{product.price}</Text>
              <Text className="text-sm text-gray-500">{product.unit}</Text>
            </View>
          </View>

          {/* Meta row */}
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Star width={16} height={16} color="#facc15" fill="#facc15" />
              <Text className="font-semibold text-sm text-gray-800">{product.rating}</Text>
            </View>
            {product.distance && (
              <View className="flex-row items-center gap-1">
                <MapPin width={14} height={14} color="#6b7280" />
                <Text className="text-sm text-gray-500">{product.distance}</Text>
              </View>
            )}
            <View className={`px-2.5 py-1 rounded-full ${product.inStock ? "bg-green-100" : "bg-red-100"}`}>
              <Text className={`text-xs font-semibold ${product.inStock ? "text-green-700" : "text-red-700"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View>
            <Text className="font-semibold text-gray-900 mb-2">Description</Text>
            <Text className="text-gray-700 text-sm leading-relaxed">{product.description}</Text>
          </View>

          {/* Vendor card */}
          <TouchableOpacity
            onPress={() => navigation.navigate("VendorProfile", { vendorId: product.vendorId })}
            className="flex-row items-center gap-3 p-3 bg-gray-50 rounded-2xl"
            activeOpacity={0.8}
          >
            <View className="w-12 h-12 bg-green-600 rounded-full items-center justify-center">
              <Store width={24} height={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-900">{product.vendorName}</Text>
              <Text className="text-sm text-gray-500">View vendor profile</Text>
            </View>
            <ArrowLeft width={18} height={18} color="#9ca3af" style={{ transform: [{ rotate: "180deg" }] }} />
          </TouchableOpacity>

          {/* Nutritional info */}
          {(product.nutrition.vitamins.length > 0 || product.nutrition.minerals.length > 0) && (
            <View className="border-t border-gray-100 pt-5">
              <View className="flex-row items-center gap-2 mb-4">
                <Leaf width={20} height={20} color="#16a34a" />
                <Text className="font-bold text-lg text-gray-900">Nutritional Information</Text>
              </View>

              {product.nutrition.vitamins.length > 0 && (
                <View className="mb-4">
                  <Text className="font-medium text-sm text-gray-700 mb-2">Vitamins</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {product.nutrition.vitamins.map((v) => (
                      <View key={v} className="px-3 py-1 bg-green-50 rounded-full">
                        <Text className="text-xs font-medium text-green-700">{v}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {product.nutrition.minerals.length > 0 && (
                <View className="mb-4">
                  <Text className="font-medium text-sm text-gray-700 mb-2">Minerals</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {product.nutrition.minerals.map((m) => (
                      <View key={m} className="px-3 py-1 bg-yellow-50 rounded-full">
                        <Text className="text-xs font-medium text-yellow-700">{m}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {(product.nutrition.protein || product.nutrition.fiber) && (
                <View className="flex-row gap-3">
                  {product.nutrition.protein ? (
                    <View className="flex-1 bg-gray-50 rounded-xl p-3">
                      <Text className="text-xs text-gray-500 mb-1">Protein</Text>
                      <Text className="font-semibold text-gray-900">{product.nutrition.protein}</Text>
                    </View>
                  ) : null}
                  {product.nutrition.fiber ? (
                    <View className="flex-1 bg-gray-50 rounded-xl p-3">
                      <Text className="text-xs text-gray-500 mb-1">Fiber</Text>
                      <Text className="font-semibold text-gray-900">{product.nutrition.fiber}</Text>
                    </View>
                  ) : null}
                </View>
              )}
            </View>
          )}

          {/* Health benefits */}
          {product.benefits.length > 0 && (
            <View className="border-t border-gray-100 pt-5">
              <View className="flex-row items-center gap-2 mb-4">
                <HeartPulse width={20} height={20} color="#dc2626" />
                <Text className="font-bold text-lg text-gray-900">Health Benefits</Text>
              </View>
              {product.benefits.map((benefit, i) => (
                <View key={i} className="flex-row items-start gap-2 mb-2">
                  <View className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                  <Text className="text-sm text-gray-700 flex-1 leading-relaxed">{benefit}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4">
        <SafeAreaView edges={["bottom"]}>
          <View className="flex-row items-center gap-3">
            {/* Quantity */}
            <View className="flex-row items-center border border-gray-200 rounded-xl overflow-hidden">
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-3 bg-gray-50"
              >
                <Minus width={16} height={16} color="#374151" />
              </TouchableOpacity>
              <Text className="font-bold text-gray-900 w-8 text-center">{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                className="px-3 py-3 bg-gray-50"
              >
                <Plus width={16} height={16} color="#374151" />
              </TouchableOpacity>
            </View>
            {/* CTA */}
            <TouchableOpacity
              disabled={!product.inStock}
              onPress={() => navigation.navigate("VendorProfile", { vendorId: product.vendorId })}
              className={`flex-1 py-4 rounded-2xl items-center ${product.inStock ? "bg-green-600" : "bg-gray-300"}`}
              activeOpacity={0.85}
            >
              <Text className="font-bold text-white">Contact Vendor</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
