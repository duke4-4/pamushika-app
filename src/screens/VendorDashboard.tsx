import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Package, DollarSign, Star, TrendingUp, Users, ShoppingBag, Settings, Eye, MapPin, Bell } from "lucide-react-native";
import BottomNav from "../components/BottomNav";
import { navigateToTab } from "../navigation/tabs";

export default function VendorDashboard({ navigation }: any) {
  const stats = [
    { label: "Products", value: "24", icon: Package, bg: "bg-green-100", iconColor: "#16a34a" },
    { label: "Revenue", value: "$1,240", icon: DollarSign, bg: "bg-yellow-100", iconColor: "#ca8a04" },
    { label: "Rating", value: "4.8", icon: Star, bg: "bg-red-100", iconColor: "#dc2626" },
    { label: "Views", value: "156", icon: Eye, bg: "bg-blue-100", iconColor: "#2563eb" },
  ];

  const recentOrders = [
    { id: "1", customer: "Sarah M.", product: "Fresh Ginger", amount: "$2.50", status: "Pending" },
    { id: "2", customer: "John D.", product: "Sweet Potatoes", amount: "$4.50", status: "Completed" },
    { id: "3", customer: "Grace K.", product: "Pumpkin Leaves", amount: "$3.00", status: "Completed" },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <SafeAreaView edges={['top']} className="bg-green-600 px-4 pt-6 pb-6 shadow-lg">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-2xl font-bold text-white">Dashboard</Text>
              <Text className="text-green-100 text-sm mt-1">Green Market Fresh</Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Bell width={20} height={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Settings width={20} height={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Stats */}
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {stats.map((stat, index) => {
              const IconComp = stat.icon;
              return (
                <View key={index} className="w-[48%] bg-white/15 rounded-2xl p-4">
                  <View className="flex-row items-center gap-2 mb-2">
                    <View className={`w-10 h-10 rounded-xl ${stat.bg} items-center justify-center`}>
                      <IconComp width={20} height={20} color={stat.iconColor} />
                    </View>
                  </View>
                  <Text className="text-2xl font-bold text-white">{stat.value}</Text>
                  <Text className="text-sm text-green-50 mt-1">{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </SafeAreaView>

        <View className="px-4 py-6 gap-6">
          {/* Quick Actions */}
          <View>
            <Text className="font-bold text-lg mb-4 text-gray-900">Quick Actions</Text>
            <View className="flex-row flex-wrap justify-between gap-y-3">
              <TouchableOpacity className="w-[48%] bg-white p-5 rounded-2xl shadow-sm">
                <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center mb-3">
                  <Package width={24} height={24} color="#16a34a" />
                </View>
                <Text className="font-semibold text-gray-900">Products</Text>
                <Text className="text-xs text-gray-500 mt-1">24 items</Text>
              </TouchableOpacity>

              <TouchableOpacity className="w-[48%] bg-white p-5 rounded-2xl shadow-sm">
                <View className="w-12 h-12 bg-yellow-100 rounded-xl items-center justify-center mb-3">
                  <ShoppingBag width={24} height={24} color="#ca8a04" />
                </View>
                <Text className="font-semibold text-gray-900">Orders</Text>
                <Text className="text-xs text-gray-500 mt-1">
                  <Text className="text-red-600 font-semibold">3</Text> pending
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="w-[48%] bg-white p-5 rounded-2xl shadow-sm">
                <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mb-3">
                  <Users width={24} height={24} color="#2563eb" />
                </View>
                <Text className="font-semibold text-gray-900">Customers</Text>
                <Text className="text-xs text-gray-500 mt-1">View insights</Text>
              </TouchableOpacity>

              <TouchableOpacity className="w-[48%] bg-white p-5 rounded-2xl shadow-sm">
                <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mb-3">
                  <MapPin width={24} height={24} color="#9333ea" />
                </View>
                <Text className="font-semibold text-gray-900">Location</Text>
                <Text className="text-xs text-gray-500 mt-1">Update address</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Orders */}
          <View className="bg-white rounded-xl border border-gray-200 p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="font-semibold text-gray-900">Recent Orders</Text>
              <TouchableOpacity><Text className="text-sm text-green-600 font-medium">View All</Text></TouchableOpacity>
            </View>

            <View className="gap-3">
              {recentOrders.map((order) => (
                <View key={order.id} className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <View className="flex-1">
                    <Text className="font-medium text-sm text-gray-900">{order.customer}</Text>
                    <Text className="text-xs text-gray-500 mt-1">{order.product}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="font-semibold text-sm text-green-600">{order.amount}</Text>
                    <View className={`mt-1 px-2 py-1 rounded-full ${order.status === "Pending" ? "bg-yellow-100" : "bg-green-100"}`}>
                      <Text className={`text-xs ${order.status === "Pending" ? "text-yellow-700" : "text-green-700"}`}>{order.status}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Performance Chart Placeholder */}
          <View className="bg-white rounded-xl border border-gray-200 p-4">
            <Text className="font-semibold mb-4 text-gray-900">This Month's Performance</Text>
            <View className="h-48 bg-green-50 rounded-lg items-end justify-around flex-row p-4 pb-0">
              <View className="items-center gap-2"><View className="w-12 bg-green-600 rounded-t" style={{ height: "60%" }} /><Text className="text-xs text-gray-600 pb-2">Wk 1</Text></View>
              <View className="items-center gap-2"><View className="w-12 bg-green-600 rounded-t" style={{ height: "80%" }} /><Text className="text-xs text-gray-600 pb-2">Wk 2</Text></View>
              <View className="items-center gap-2"><View className="w-12 bg-green-600 rounded-t" style={{ height: "70%" }} /><Text className="text-xs text-gray-600 pb-2">Wk 3</Text></View>
              <View className="items-center gap-2"><View className="w-12 bg-green-600 rounded-t" style={{ height: "90%" }} /><Text className="text-xs text-gray-600 pb-2">Wk 4</Text></View>
            </View>
            <View className="flex-row items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <TrendingUp width={16} height={16} color="#16a34a" />
              <Text className="text-gray-700 text-sm">Sales increased by <Text className="font-semibold text-green-600">12%</Text></Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNav
        activeTab="vendor-dashboard"
        onNavigate={(tab) => navigateToTab(navigation, tab, "vendor")}
        userType="vendor"
      />
    </View>
  );
}
