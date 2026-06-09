import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Search, Heart, User, Store } from "lucide-react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomNavProps {
  activeTab: string;
  onNavigate: (page: string) => void;
  userType?: "consumer" | "vendor";
}

export default function BottomNav({ activeTab, onNavigate, userType = "consumer" }: BottomNavProps) {
  const insets = useSafeAreaInsets();
  
  const consumerTabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "favorites", icon: Heart, label: "Favorites" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const vendorTabs = [
    { id: "vendor-dashboard", icon: Home, label: "Dashboard" },
    { id: "vendor-products", icon: Store, label: "Products" },
    { id: "vendor-posts", icon: Search, label: "Posts" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const tabs = userType === "vendor" ? vendorTabs : consumerTabs;

  return (
    <View 
      className="bg-white border-t border-gray-200 px-2 pt-2 flex-row items-center justify-around shadow-lg absolute bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onNavigate(tab.id)}
            className={`flex-1 mx-0.5 flex-col items-center gap-1 py-2 rounded-xl ${
              isActive ? "bg-green-50" : ""
            }`}
          >
            <IconComponent width={24} height={24} color={isActive ? "#16a34a" : "#9ca3af"} />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              className={`text-xs font-medium ${isActive ? "text-green-600" : "text-gray-400"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
