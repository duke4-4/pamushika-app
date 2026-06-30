import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarDays, Eye, MessageCircle, Plus, Send, Sparkles } from "lucide-react-native";
import BottomNav from "../components/BottomNav";
import { SkeletonList } from "../components/LoadingFeedback";
import { useAsync } from "../hooks/useAsync";
import { fetchVendorPosts } from "../services/vendorPosts";
import { DEMO_VENDOR_ID } from "../services/vendors";
import { navigateToTab } from "../navigation/tabs";

export default function VendorPosts({ navigation }: any) {
  const { data, loading } = useAsync(() => fetchVendorPosts(DEMO_VENDOR_ID), []);
  const posts = data ?? [];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 110 }}>
        <SafeAreaView edges={["top"]} className="bg-green-600 px-4 pt-5 pb-6">
          <View className="flex-row items-center justify-between mb-5">
            <View>
              <Text className="text-2xl font-bold text-white">Posts</Text>
              <Text className="text-green-100 text-sm mt-1">Promote produce and healthy tips</Text>
            </View>
            <TouchableOpacity className="w-11 h-11 rounded-full bg-white items-center justify-center">
              <Plus width={22} height={22} color="#16a34a" />
            </TouchableOpacity>
          </View>

          <View className="bg-white/15 rounded-2xl p-4 flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-yellow-300 items-center justify-center">
              <Sparkles width={23} height={23} color="#14532d" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-white">Create a featured update</Text>
              <Text className="text-sm text-green-50 mt-1">Share restocks, bundles, recipes, or offers.</Text>
            </View>
          </View>
        </SafeAreaView>

        <View className="px-4 py-5 gap-4">
          {loading ? (
            <SkeletonList rows={3} />
          ) : posts.map((post) => {
            return (
              <View key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <Image source={{ uri: post.productImage }} className="w-full h-40 bg-gray-100" />
                <View className="p-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center gap-1.5">
                      <CalendarDays width={14} height={14} color="#6b7280" />
                      <Text className="text-xs text-gray-500">{post.date}</Text>
                    </View>
                    <View className="px-2.5 py-1 bg-green-50 rounded-full">
                      <Text className="text-xs font-semibold text-green-700">{post.productCategory}</Text>
                    </View>
                  </View>

                  <Text className="text-lg font-bold text-gray-900">{post.title}</Text>
                  <Text className="text-sm text-gray-600 mt-2" numberOfLines={2}>{post.body}</Text>

                  <View className="flex-row items-center justify-between pt-4 mt-4 border-t border-gray-100">
                    <View className="flex-row items-center gap-4">
                      <View className="flex-row items-center gap-1.5">
                        <Eye width={16} height={16} color="#6b7280" />
                        <Text className="text-xs text-gray-500">{post.views}</Text>
                      </View>
                      <View className="flex-row items-center gap-1.5">
                        <MessageCircle width={16} height={16} color="#6b7280" />
                        <Text className="text-xs text-gray-500">{post.replies}</Text>
                      </View>
                    </View>
                    <TouchableOpacity className="flex-row items-center gap-1.5 px-3 py-1.5 bg-green-600 rounded-full">
                      <Send width={13} height={13} color="white" />
                      <Text className="text-xs font-semibold text-white">Share</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <BottomNav activeTab="vendor-posts" userType="vendor" onNavigate={(tab) => navigateToTab(navigation, tab, "vendor")} />
    </View>
  );
}
