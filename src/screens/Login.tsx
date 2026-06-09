import React, { useState } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { ArrowLeft } from "lucide-react-native";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Mock authentication
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50" edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="px-4 py-5 bg-white shadow-sm flex-row items-center z-10">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
            <ArrowLeft width={24} height={24} color="#374151" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-bold text-xl text-gray-900">Sign In</Text>
          <View className="w-9" />
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}>
          <View className="mb-8 items-center">
            <Text className="text-gray-600 text-sm">Welcome back to PAMUSHIKA IN</Text>
          </View>

          <View className="gap-5">
            <View className="gap-2">
              <Label>Email Address</Label>
              <Input
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="gap-2">
              <Label>Password</Label>
              <Input
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View className="flex-row justify-end">
              <TouchableOpacity>
                <Text className="text-sm text-green-600 font-medium">Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <Button onPress={handleSubmit} className="mt-6">
              Sign In
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
