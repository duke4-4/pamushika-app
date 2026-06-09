import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, ChevronRight, CreditCard, HelpCircle, LogOut, MapPin, Settings, Shield, Store, User } from "lucide-react-native";
import BottomNav from "../components/BottomNav";
import { navigateToTab, UserType } from "../navigation/tabs";

export default function Profile({ navigation, route }: any) {
  const userType: UserType = route?.params?.userType === "vendor" ? "vendor" : "consumer";
  const isVendor = userType === "vendor";

  const settings = [
    { label: "Personal details", icon: User },
    { label: isVendor ? "Business settings" : "Delivery location", icon: isVendor ? Store : MapPin },
    { label: "Notifications", icon: Bell },
    { label: "Payments", icon: CreditCard },
    { label: "Help and support", icon: HelpCircle },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 110 }}>
        <SafeAreaView edges={["top"]} className="bg-green-600 px-4 pt-5 pb-8">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-white">Profile</Text>
              <Text className="text-green-100 text-sm mt-1">
                {isVendor ? "Manage your vendor account" : "Manage your market account"}
              </Text>
            </View>
            <TouchableOpacity className="w-11 h-11 rounded-full bg-white/20 items-center justify-center">
              <Settings width={20} height={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View className="px-4 -mt-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center gap-4">
              <View className="w-20 h-20 rounded-2xl bg-green-100 items-center justify-center">
                <Text className="text-3xl font-bold text-green-700">{isVendor ? "G" : "T"}</Text>
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg font-bold text-gray-900">{isVendor ? "Green Market Fresh" : "Tariro Moyo"}</Text>
                  {isVendor && <Shield width={16} height={16} color="#16a34a" />}
                </View>
                <Text className="text-sm text-gray-500 mt-1">{isVendor ? "Premium vendor" : "Harare, Zimbabwe"}</Text>
                <TouchableOpacity className="self-start mt-3 px-3 py-1.5 rounded-full bg-green-50">
                  <Text className="text-xs font-semibold text-green-700">Edit profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="px-4 py-5">
          <View className="flex-row gap-3 mb-5">
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <Text className="text-2xl font-bold text-gray-900">{isVendor ? "24" : "12"}</Text>
              <Text className="text-xs text-gray-500 mt-1">{isVendor ? "Products" : "Favorites"}</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <Text className="text-2xl font-bold text-gray-900">{isVendor ? "4.8" : "7"}</Text>
              <Text className="text-xs text-gray-500 mt-1">{isVendor ? "Rating" : "Orders"}</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <Text className="text-2xl font-bold text-gray-900">{isVendor ? "156" : "3"}</Text>
              <Text className="text-xs text-gray-500 mt-1">{isVendor ? "Views" : "Vendors"}</Text>
            </View>
          </View>

          {!isVendor && (
            <TouchableOpacity
              onPress={() => navigation.navigate("VendorRegister")}
              className="bg-green-600 rounded-2xl p-4 mb-5 flex-row items-center gap-3"
            >
              <View className="w-12 h-12 rounded-xl bg-white/20 items-center justify-center">
                <Store width={24} height={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-white">Become a vendor</Text>
                <Text className="text-sm text-green-100 mt-1">Sell fresh produce to nearby customers</Text>
              </View>
              <ChevronRight width={18} height={18} color="white" />
            </TouchableOpacity>
          )}

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {settings.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.label}
                  className={`px-4 py-4 flex-row items-center gap-3 ${index === settings.length - 1 ? "" : "border-b border-gray-100"}`}
                >
                  <View className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">
                    <Icon width={19} height={19} color="#374151" />
                  </View>
                  <Text className="flex-1 font-medium text-gray-900">{item.label}</Text>
                  <ChevronRight width={18} height={18} color="#9ca3af" />
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity className="mt-5 bg-white rounded-2xl p-4 flex-row items-center gap-3 shadow-sm">
            <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center">
              <LogOut width={19} height={19} color="#dc2626" />
            </View>
            <Text className="font-semibold text-red-600">Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav activeTab="profile" userType={userType} onNavigate={(tab) => navigateToTab(navigation, tab, userType)} />
    </View>
  );
}
