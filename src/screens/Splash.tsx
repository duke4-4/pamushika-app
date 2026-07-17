import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OptimisticLoading } from "../components/LoadingFeedback";

export default function Splash() {
  return (
    <SafeAreaView className="flex-1 bg-green-600 px-6">
      <View className="flex-1 items-center justify-center">
        <View className="w-32 h-32 bg-white rounded-3xl items-center justify-center shadow-lg mb-6 p-4">
          <Image
            source={require("../../assets/logo-mark.png")}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <Text className="text-4xl font-bold text-white text-center">Pamushika In</Text>
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
