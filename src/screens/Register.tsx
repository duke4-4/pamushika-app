import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { ArrowLeft } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";

export default function Register({ navigation }: any) {
  const { signUpWithEmail } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      Alert.alert("Missing details", "Full name, email, and password are required.");
      return;
    }
    setSubmitting(true);
    try {
      await signUpWithEmail({
        email: formData.email.trim(),
        password: formData.password,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim() || undefined,
        location: formData.location.trim() || undefined,
        userType: "consumer",
      });
      // RootNavigator switches to Home automatically once signed in.
    } catch (error: any) {
      Alert.alert("Couldn't create account", error?.message ?? "Please try again.");
    } finally {
      setSubmitting(false);
    }
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
          <Text className="flex-1 text-center font-bold text-xl text-gray-900">Create Account</Text>
          <View className="w-9" />
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24 }}>
          <View className="mb-6 items-center">
            <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center shadow-sm mb-3 p-2.5">
              <Image
                source={require("../../assets/logo-mark.png")}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
            <Text className="text-gray-600 text-sm">Join Pamushika In today</Text>
          </View>

          <View className="gap-4">
            <View className="gap-2">
              <Label>Full Name</Label>
              <Input
                placeholder="John Doe"
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
              />
            </View>

            <View className="gap-2">
              <Label>Email Address</Label>
              <Input
                placeholder="your@email.com"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="gap-2">
              <Label>Phone Number</Label>
              <Input
                placeholder="+263 XXX XXX XXX"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
              />
            </View>

            <View className="gap-2">
              <Label>Location</Label>
              <Input
                placeholder="Harare, Zimbabwe"
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
              />
            </View>

            <View className="gap-2">
              <Label>Password</Label>
              <Input
                placeholder="••••••••"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry
              />
            </View>

            <Button onPress={handleSubmit} disabled={submitting} className={`mt-6 ${submitting ? "opacity-50" : ""}`}>
              {submitting ? "Creating account..." : "Create Account"}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
