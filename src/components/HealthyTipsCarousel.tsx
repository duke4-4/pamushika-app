import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Apple, Heart, Leaf } from "lucide-react-native";

const healthyTips = [
  {
    id: "1",
    icon: Apple,
    color: "bg-green-500",
    title: "Eat a Rainbow",
    tip: "Consume fruits and vegetables of different colors daily for maximum nutrients",
  },
  {
    id: "2",
    icon: Heart,
    color: "bg-red-500",
    title: "Stay Hydrated",
    tip: "Drink at least 8 glasses of water daily. Add lemon for extra vitamin C!",
  },
  {
    id: "3",
    icon: Leaf,
    color: "bg-yellow-400",
    title: "Go Organic",
    tip: "Choose organic produce when possible to reduce pesticide exposure",
  },
  {
    id: "4",
    icon: Apple,
    color: "bg-green-600",
    title: "Seasonal is Best",
    tip: "Buy seasonal produce for better taste, nutrition, and value for money",
  },
];

export default function HealthyTipsCarousel() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-1">
      <View className="flex-row gap-3 pr-6">
        {healthyTips.map((tip) => {
          const IconComponent = tip.icon;
          return (
            <View key={tip.id} style={{ width: 280 }}>
              <View className={`${tip.color} rounded-2xl p-4 shadow-md h-full`}>
                <View className="flex-row items-start gap-3">
                  <View className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center">
                    <IconComponent width={20} height={20} color="white" />
                  </View>
                  <View className="flex-1 pr-2">
                    <Text className="font-bold text-sm mb-1 text-white">{tip.title}</Text>
                    <Text className="text-xs leading-relaxed text-white opacity-95">{tip.tip}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
