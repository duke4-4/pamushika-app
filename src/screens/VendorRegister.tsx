import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Store, CheckCircle, ArrowLeft } from "lucide-react-native";

export default function VendorRegister({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      {/* Header */}
      <View className="px-4 py-5 bg-white shadow-sm flex-row items-center z-10 border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <ArrowLeft width={20} height={20} color="#111827" />
        </TouchableOpacity>
        <Text className="flex-1 text-center font-bold text-xl text-gray-900">Become a Vendor</Text>
        <View className="w-9" />
      </View>

      {/* Content */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <View className="items-center mb-8 gap-4">
          <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center">
            <Store width={40} height={40} color="#16a34a" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 text-center">Grow Your Business</Text>
          <Text className="text-gray-600 text-center px-4">
            Join PAMUSHIKA IN and reach thousands of customers looking for fresh, healthy produce
          </Text>
        </View>

        <View className="gap-5">
          <View className="flex-row gap-3">
            <CheckCircle width={20} height={20} color="#16a34a" className="mt-0.5" />
            <View>
              <Text className="font-medium text-gray-900">Digital Storefront</Text>
              <Text className="text-sm text-gray-600">Get your own online presence</Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <CheckCircle width={20} height={20} color="#16a34a" className="mt-0.5" />
            <View>
              <Text className="font-medium text-gray-900">Customer Ratings</Text>
              <Text className="text-sm text-gray-600">Build trust and credibility</Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <CheckCircle width={20} height={20} color="#16a34a" className="mt-0.5" />
            <View>
              <Text className="font-medium text-gray-900">Location-Based Discovery</Text>
              <Text className="text-sm text-gray-600">Be found by nearby customers</Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <CheckCircle width={20} height={20} color="#16a34a" className="mt-0.5" />
            <View>
              <Text className="font-medium text-gray-900">Business Analytics</Text>
              <Text className="text-sm text-gray-600">Track your sales and performance</Text>
            </View>
          </View>
        </View>

        <View className="gap-3 pt-10">
          <Button onPress={() => navigation.navigate("VendorOnboarding")}>
            Get Started
          </Button>

          <Button onPress={() => navigation.navigate("Login")} variant="outline">
            I already have an account
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
