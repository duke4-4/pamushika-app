import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

const tips = [
  "Health tip: add leafy greens to one meal today for iron, fiber, and vitamins.",
  "Technical tip: a cached result can make repeat searches feel instant.",
  "Health tip: colorful produce usually means a wider mix of nutrients.",
  "Technical tip: optimistic updates show the expected result while the app confirms it.",
  "Health tip: rinse fresh vegetables before storing so meal prep is faster.",
  "Technical tip: nearby vendor searches work best when location data is fresh.",
];

interface OptimisticLoadingProps {
  title: string;
  subtitle?: string;
  compact?: boolean;
}

export function OptimisticLoading({ title, subtitle, compact = false }: OptimisticLoadingProps) {
  const [progress, setProgress] = useState(18);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((value) => (value >= 92 ? 92 : value + 9));
    }, 260);
    const tipTimer = setInterval(() => {
      setTipIndex((value) => (value + 1) % tips.length);
    }, 1500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(tipTimer);
    };
  }, []);

  return (
    <View className={`bg-white rounded-2xl shadow-sm ${compact ? "p-4" : "p-5"}`}>
      <Text className="font-bold text-gray-900">{title}</Text>
      {subtitle && <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>}
      <View className="h-2 bg-green-100 rounded-full overflow-hidden mt-4">
        <View className="h-full bg-green-600 rounded-full" style={{ width: `${progress}%` }} />
      </View>
      <Text className="text-xs text-gray-500 mt-3">{tips[tipIndex]}</Text>
    </View>
  );
}

interface SkeletonListProps {
  rows?: number;
}

export function SkeletonList({ rows = 3 }: SkeletonListProps) {
  const items = useMemo(() => Array.from({ length: rows }, (_, index) => index), [rows]);

  return (
    <View className="gap-3">
      {items.map((item) => (
        <View key={item} className="bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row gap-3">
            <View className="w-16 h-16 rounded-xl bg-gray-200" />
            <View className="flex-1 gap-2">
              <View className="h-4 bg-gray-200 rounded-full w-3/4" />
              <View className="h-3 bg-gray-100 rounded-full w-full" />
              <View className="h-3 bg-gray-100 rounded-full w-2/3" />
              <View className="h-7 bg-green-100 rounded-full w-24 mt-1" />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
