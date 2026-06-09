import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Apple, Leaf, ShoppingBasket } from "lucide-react-native";

export default function Welcome({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-green-50">
      {/* Hero Section */}
      <View className="flex-1 items-center justify-center px-6 py-8">
        <View className="items-center w-full gap-6">
          {/* Logo/Icon */}
          <View className="flex-row justify-center gap-4 mb-6">
            <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center shadow-lg">
              <Apple width={40} height={40} color="white" />
            </View>
            <View className="w-20 h-20 bg-yellow-400 rounded-full items-center justify-center shadow-lg">
              <Leaf width={40} height={40} color="white" />
            </View>
            <View className="w-20 h-20 bg-red-500 rounded-full items-center justify-center shadow-lg">
              <ShoppingBasket width={40} height={40} color="white" />
            </View>
          </View>

          <View className="items-center">
            <Text className="text-3xl font-bold text-gray-900 mb-3 text-center">
              PAMUSHIKA IN
            </Text>
            <Text className="text-base text-gray-600 px-4 text-center">
              Connecting you with local vendors for fresh fruits, vegetables, and indigenous African foods
            </Text>
          </View>

          <View className="w-full pt-6 px-4 gap-3">
            <Button onPress={() => navigation.navigate("Login")}>
              Sign In
            </Button>

            <Button onPress={() => navigation.navigate("Register")} variant="outline">
              Create Account
            </Button>

            <TouchableOpacity
              onPress={() => navigation.navigate("VendorRegister")}
              className="w-full items-center mt-3 py-2"
            >
              <Text className="text-sm text-gray-600 underline">
                I'm a vendor - Join now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Features */}
      <View className="px-6 pb-8 gap-3">
        <View className="flex-row items-center gap-3 bg-white/60 rounded-lg p-3">
          <View className="w-2 h-2 bg-green-500 rounded-full" />
          <Text className="text-sm text-gray-700">Find fresh organic produce nearby</Text>
        </View>
        <View className="flex-row items-center gap-3 bg-white/60 rounded-lg p-3">
          <View className="w-2 h-2 bg-yellow-400 rounded-full" />
          <Text className="text-sm text-gray-700">Learn about nutritional benefits</Text>
        </View>
        <View className="flex-row items-center gap-3 bg-white/60 rounded-lg p-3">
          <View className="w-2 h-2 bg-red-500 rounded-full" />
          <Text className="text-sm text-gray-700">Support local vendors</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
