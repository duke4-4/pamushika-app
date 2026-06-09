import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Apple, Leaf, ShoppingBasket } from "lucide-react-native";
import { OptimisticLoading } from "../components/LoadingFeedback";

export default function Splash() {
  return (
    <SafeAreaView className="flex-1 bg-green-600 px-6">
      <View className="flex-1 items-center justify-center">
        <View className="flex-row gap-3 mb-8">
          <View className="w-20 h-20 bg-white rounded-3xl items-center justify-center shadow-lg">
            <Apple width={38} height={38} color="#16a34a" />
          </View>
          <View className="w-20 h-20 bg-yellow-300 rounded-3xl items-center justify-center shadow-lg">
            <Leaf width={38} height={38} color="#14532d" />
          </View>
          <View className="w-20 h-20 bg-red-500 rounded-3xl items-center justify-center shadow-lg">
            <ShoppingBasket width={38} height={38} color="white" />
          </View>
        </View>

        <Text className="text-4xl font-bold text-white text-center">PAMUSHIKA IN</Text>
        <Text className="text-green-100 text-center mt-3 px-6">
          Fresh local produce, trusted vendors, healthier choices.
        </Text>
      </View>

      <View className="pb-8">
        <OptimisticLoading
          title="Preparing your market"
          subtitle="Loading vendors, healthy tips, and account tools."
          compact
        />
      </View>
    </SafeAreaView>
  );
}
