import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Clock, Heart, MapPin, MessageCircle, Navigation, Phone, Shield, Star } from "lucide-react-native";
import { SkeletonList } from "../components/LoadingFeedback";
import { useAsync } from "../hooks/useAsync";
import { fetchVendorById } from "../services/vendors";
import { fetchProductsByVendor } from "../services/products";
import { fetchFavoriteVendorIds, toggleVendorFavorite } from "../services/favorites";
import { useAuth } from "../context/AuthContext";

export default function VendorProfile({ navigation, route }: any) {
  const { vendorId } = route.params as { vendorId: string };
  const { user } = useAuth();

  const { data: vendor, loading: vendorLoading } = useAsync(() => fetchVendorById(vendorId), [vendorId]);
  const { data: products, loading: productsLoading } = useAsync(() => fetchProductsByVendor(vendorId), [vendorId]);
  const { data: favVendorIds } = useAsync(
    () => (user ? fetchFavoriteVendorIds(user.uid) : Promise.resolve([])),
    [user?.uid]
  );

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favVendorIds) setIsFavorite(favVendorIds.includes(vendorId));
  }, [favVendorIds, vendorId]);

  const handleToggleFavorite = async () => {
    if (!user) return;
    const prev = isFavorite;
    setIsFavorite(!prev);
    try {
      await toggleVendorFavorite(user.uid, vendorId, prev);
    } catch {
      setIsFavorite(prev);
    }
  };

  const loading = vendorLoading || productsLoading;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
        <View className="px-4 py-4 bg-green-700 flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
            <ArrowLeft width={20} height={20} color="white" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-bold text-white">Vendor Profile</Text>
          <View className="w-9" />
        </View>
        <View className="px-4 py-6"><SkeletonList rows={4} /></View>
      </SafeAreaView>
    );
  }

  if (!vendor) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center" edges={["top"]}>
        <Text className="text-gray-400">Vendor not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 px-4 py-2 bg-green-600 rounded-full">
          <Text className="text-white font-semibold">Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const productList = products ?? [];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero */}
        <SafeAreaView edges={["top"]} className="bg-green-800 px-4 pt-4 pb-8 overflow-hidden">
          {/* Decorative circles */}
          <View
            className="absolute bg-white/5 rounded-full"
            style={{ width: 160, height: 160, top: -40, right: -30 }}
          />
          <View
            className="absolute bg-white/5 rounded-full"
            style={{ width: 120, height: 120, bottom: -30, left: -20 }}
          />

          <View className="flex-row items-center gap-3 mb-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            >
              <ArrowLeft width={20} height={20} color="white" />
            </TouchableOpacity>
            <Text className="flex-1 font-bold text-lg text-white">Vendor Profile</Text>
            <TouchableOpacity
              onPress={handleToggleFavorite}
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            >
              <Heart
                width={20}
                height={20}
                color="white"
                fill={isFavorite ? "white" : "none"}
              />
            </TouchableOpacity>
          </View>

          {/* Vendor info */}
          <View className="items-center">
            <View className="w-24 h-24 bg-white/20 rounded-3xl items-center justify-center text-4xl font-extrabold mb-3 border-2 border-white/30">
              <Text className="text-white text-4xl font-extrabold">{vendor.name.charAt(0)}</Text>
            </View>
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="font-extrabold text-xl text-white">{vendor.name}</Text>
              {vendor.verified && <Shield width={18} height={18} color="#86efac" fill="#86efac" />}
            </View>
            <View className="flex-row items-center gap-1 mb-4">
              <MapPin width={14} height={14} color="#86efac" />
              <Text className="text-green-300 text-sm">{vendor.location}</Text>
            </View>

            <View className="flex-row items-center gap-6">
              <View className="items-center">
                <View className="flex-row items-center gap-1 mb-0.5">
                  <Star width={16} height={16} color="#fde68a" fill="#fde68a" />
                  <Text className="font-extrabold text-white">{vendor.rating}</Text>
                </View>
                <Text className="text-xs text-green-300">{vendor.reviewCount} reviews</Text>
              </View>
              <View className="w-px h-8 bg-white/20" />
              <View className="items-center">
                <Clock width={16} height={16} color="#86efac" />
                <Text className="text-xs text-green-300 mt-0.5">Open Now</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>

        {/* Contact actions */}
        <View className="mx-4 -mt-5 bg-white rounded-2xl shadow-lg p-4 flex-row gap-3 z-10">
          {[
            { Icon: Phone, label: "Call", bg: "bg-green-50" },
            { Icon: MessageCircle, label: "Message", bg: "bg-blue-50" },
            { Icon: Navigation, label: "Directions", bg: "bg-red-50" },
          ].map(({ Icon, label, bg }) => (
            <TouchableOpacity
              key={label}
              onPress={() => Alert.alert("Coming soon", `${label} integration is in a future phase.`)}
              className="flex-1 items-center py-3"
              activeOpacity={0.7}
            >
              <View className={`w-11 h-11 ${bg} rounded-xl items-center justify-center mb-1.5`}>
                <Icon width={20} height={20} color={label === "Call" ? "#16a34a" : label === "Message" ? "#2563eb" : "#ef4444"} />
              </View>
              <Text className="text-xs font-bold text-gray-700">{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories */}
        <View className="px-4 pt-5 flex-row flex-wrap gap-2">
          {vendor.categories.map((cat) => (
            <View key={cat} className="px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
              <Text className="text-xs font-bold text-green-700">{cat}</Text>
            </View>
          ))}
        </View>

        {/* Products */}
        <View className="px-4 pt-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-bold text-gray-900">Available Products</Text>
            <View className="bg-gray-100 px-2.5 py-1 rounded-full">
              <Text className="text-xs font-semibold text-gray-500">{productList.length} items</Text>
            </View>
          </View>

          {productList.length === 0 ? (
            <View className="bg-white rounded-2xl p-12 items-center shadow-sm">
              <Text className="text-gray-400 text-sm">No products listed yet</Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap gap-3">
              {productList.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => navigation.navigate("ProductDetails", { productId: product.id })}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                  style={{ width: "47.5%" }}
                  activeOpacity={0.85}
                >
                  <Image
                    source={{ uri: product.image }}
                    className="w-full bg-gray-100"
                    style={{ aspectRatio: 1 }}
                    resizeMode="cover"
                  />
                  {product.inStock && (
                    <View className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 rounded-full">
                      <Text className="text-white text-xs font-bold">Fresh</Text>
                    </View>
                  )}
                  <View className="p-3">
                    <Text className="font-bold text-sm text-gray-900 mb-1" numberOfLines={1}>{product.name}</Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-green-600 font-bold text-sm">{product.price} <Text className="text-xs text-gray-400 font-normal">{product.unit}</Text></Text>
                      <View className="flex-row items-center gap-0.5">
                        <Star width={12} height={12} color="#facc15" fill="#facc15" />
                        <Text className="font-bold text-xs text-gray-700">{product.rating}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Reviews placeholder */}
        <View className="px-4 pt-6 pb-4">
          <Text className="font-bold text-gray-900 mb-3">Customer Reviews</Text>
          <View className="bg-white rounded-2xl p-8 items-center shadow-sm border border-gray-100">
            <Star width={28} height={28} color="#d1d5db" />
            <Text className="text-gray-400 text-sm mt-3">No reviews yet</Text>
            <Text className="text-gray-300 text-xs mt-1">Be the first to leave a review</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
