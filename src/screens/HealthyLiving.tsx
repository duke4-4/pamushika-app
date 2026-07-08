import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Apple, ChefHat, Flame, Leaf, Lightbulb, Trophy, Wheat } from "lucide-react-native";
import { SkeletonList } from "../components/LoadingFeedback";
import { useAsync } from "../hooks/useAsync";
import { fetchHealthyTips } from "../services/healthyTips";
import { HealthyTip } from "../types/marketplace";

const QUICK_TIPS = [
  "Aim for at least 5 servings of fruits and vegetables daily",
  "Eat a rainbow of colors to get diverse nutrients",
  "Include indigenous African foods in your diet for traditional nutrients",
  "Buy fresh, seasonal produce from local vendors",
];

function getTypeStyle(type: string): { bg: string; text: string; Icon: React.ComponentType<any> } {
  switch (type) {
    case "fruit":      return { bg: "bg-red-50",    text: "text-red-600",    Icon: Apple };
    case "vegetable":  return { bg: "bg-green-50",  text: "text-green-600",  Icon: Leaf };
    case "recipe":     return { bg: "bg-yellow-50", text: "text-yellow-600", Icon: ChefHat };
    case "indigenous": return { bg: "bg-orange-50", text: "text-orange-600", Icon: Wheat };
    default:           return { bg: "bg-blue-50",   text: "text-blue-600",   Icon: Lightbulb };
  }
}

function TipCard({ tip }: { tip: HealthyTip }) {
  const { bg, text, Icon } = getTypeStyle(tip.type);
  return (
    <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4">
      {tip.image ? (
        <Image
          source={{ uri: tip.image }}
          className="w-full bg-gray-100"
          style={{ height: 160 }}
          resizeMode="cover"
        />
      ) : (
        <View className="w-full bg-green-50 items-center justify-center" style={{ height: 100 }}>
          <Icon width={40} height={40} color="#16a34a" />
        </View>
      )}
      <View className="p-4">
        <View className={`self-start flex-row items-center gap-1.5 px-3 py-1 rounded-full mb-3 ${bg}`}>
          <Icon width={13} height={13} color={text.replace("text-", "").includes("green") ? "#16a34a" : undefined} />
          <Text className={`text-xs font-bold capitalize ${text}`}>{tip.type.replace("-", " ")}</Text>
        </View>
        <Text className="font-bold text-gray-900 mb-2">{tip.title}</Text>
        <Text className="text-sm text-gray-600 leading-relaxed">{tip.description}</Text>
      </View>
    </View>
  );
}

export default function HealthyLiving({ navigation }: any) {
  const { data: tips, loading } = useAsync(fetchHealthyTips, []);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <SafeAreaView edges={["top"]} className="bg-green-600 px-4 pt-4 pb-8">
          <View className="flex-row items-center gap-3 mb-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            >
              <ArrowLeft width={20} height={20} color="white" />
            </TouchableOpacity>
            <Text className="flex-1 font-bold text-lg text-white">Healthy Living</Text>
            <View className="w-10" />
          </View>
          <View className="items-center">
            <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center mb-4 border-2 border-white/30">
              <Leaf width={32} height={32} color="white" />
            </View>
            <Text className="font-extrabold text-xl text-white mb-1">Your Daily Nutrition Guide</Text>
            <Text className="text-green-200 text-sm">Benefits of fruits, vegetables & indigenous foods</Text>
          </View>
        </SafeAreaView>

        {/* Streak Banner */}
        <View className="mx-4 -mt-5 bg-yellow-400 rounded-2xl px-4 py-3 flex-row items-center gap-3 shadow-lg">
          <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
            <Flame width={20} height={20} color="white" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5">
              <Trophy width={16} height={16} color="white" />
              <Text className="font-bold text-white text-sm">7-Day Healthy Streak!</Text>
            </View>
            <Text className="text-yellow-100 text-xs">You're on a roll — keep it up!</Text>
          </View>
        </View>

        {/* Tips feed */}
        <View className="px-4 pt-5">
          {loading ? (
            <SkeletonList rows={3} />
          ) : (tips ?? []).length === 0 ? (
            <View className="items-center py-12">
              <Leaf width={40} height={40} color="#d1d5db" />
              <Text className="text-gray-400 mt-3 text-sm">No tips available yet</Text>
            </View>
          ) : (
            (tips ?? []).map((tip) => <TipCard key={tip.id} tip={tip} />)
          )}
        </View>

        {/* Quick Tips */}
        <View className="mx-4 mb-4 bg-white rounded-2xl p-5 shadow-sm border border-yellow-100">
          <View className="flex-row items-center gap-2 mb-4">
            <View className="w-7 h-7 bg-yellow-100 rounded-lg items-center justify-center">
              <Lightbulb width={16} height={16} color="#d97706" />
            </View>
            <Text className="font-bold text-gray-900">Quick Health Tips</Text>
          </View>
          {QUICK_TIPS.map((tip, i) => (
            <View key={i} className="flex-row items-start gap-3 mb-3">
              <View className="w-6 h-6 bg-yellow-400 rounded-full items-center justify-center flex-shrink-0 mt-0.5">
                <Text className="text-white text-xs font-bold">{i + 1}</Text>
              </View>
              <Text className="text-gray-700 text-sm flex-1 leading-relaxed">{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
