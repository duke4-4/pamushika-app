import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Apple, Leaf, Wheat, Lightbulb, ChefHat } from "lucide-react-native";
import { useAsync } from '../hooks/useAsync';
import { fetchHealthyTips } from '../services/healthyTips';
import { HealthyTip } from '../types/marketplace';

type TipStyle = { bg: string; iconColor: string; Icon: React.ComponentType<any> };

function getTipStyle(type: string): TipStyle {
  switch (type) {
    case "fruit":      return { bg: "bg-red-500",    iconColor: "white", Icon: Apple };
    case "vegetable":  return { bg: "bg-green-600",  iconColor: "white", Icon: Leaf };
    case "recipe":     return { bg: "bg-yellow-500", iconColor: "white", Icon: ChefHat };
    case "indigenous": return { bg: "bg-orange-500", iconColor: "white", Icon: Wheat };
    default:           return { bg: "bg-blue-500",   iconColor: "white", Icon: Lightbulb };
  }
}

function TipCard({ tip }: { tip: HealthyTip }) {
  const { bg, Icon } = getTipStyle(tip.type);
  return (
    <View style={{ width: 280 }}>
      <View className={`${bg} rounded-2xl overflow-hidden shadow-md`} style={{ height: 110 }}>
        {tip.image ? (
          <Image
            source={{ uri: tip.image }}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />
        ) : null}
        <View className="absolute inset-0 bg-black/40" />
        <View className="flex-row items-start gap-3 p-4 flex-1 relative z-10">
          <View className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center flex-shrink-0">
            <Icon width={20} height={20} color="white" />
          </View>
          <View className="flex-1 pr-2">
            <Text className="font-bold text-sm mb-1 text-white" numberOfLines={1}>{tip.title}</Text>
            <Text className="text-xs leading-relaxed text-white/90" numberOfLines={3}>{tip.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function SkeletonCard() {
  return (
    <View style={{ width: 280 }}>
      <View className="bg-gray-200 rounded-2xl h-[110px] animate-pulse" />
    </View>
  );
}

export default function HealthyTipsCarousel() {
  const { data: tips, loading } = useAsync(fetchHealthyTips, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-1">
      <View className="flex-row gap-3 pr-6">
        {loading
          ? [1, 2, 3].map((k) => <SkeletonCard key={k} />)
          : (tips ?? []).map((tip) => <TipCard key={tip.id} tip={tip} />)
        }
      </View>
    </ScrollView>
  );
}
