import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConfirmationResult } from "@react-native-firebase/auth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { ArrowLeft } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";

export default function Login({ navigation }: any) {
  const { signInWithEmail, sendPhoneCode, confirmPhoneCode } = useAuth();
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [submitting, setSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);

  const handleEmailSubmit = async () => {
    setSubmitting(true);
    try {
      const profile = await signInWithEmail(email.trim(), password);
      if (!profile) {
        Alert.alert("Account not found", "We couldn't find a profile for this account. Please contact support.");
      }
      // RootNavigator switches to the right screen automatically once signed in.
    } catch (error: any) {
      Alert.alert("Sign in failed", error?.message ?? "Please check your email and password and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendCode = async () => {
    setSubmitting(true);
    try {
      const result = await sendPhoneCode(phone.trim());
      setConfirmation(result);
    } catch (error: any) {
      Alert.alert("Couldn't send code", error?.message ?? "Check the phone number and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!confirmation) return;
    setSubmitting(true);
    try {
      const profile = await confirmPhoneCode(confirmation, code.trim());
      if (!profile) {
        Alert.alert("Account not found", "We couldn't find a profile for this account. Please contact support.");
      }
    } catch (error: any) {
      Alert.alert("Verification failed", error?.message ?? "That code didn't work. Try again.");
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
          <Text className="flex-1 text-center font-bold text-xl text-gray-900">Sign In</Text>
          <View className="w-9" />
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}>
          <View className="mb-8 items-center">
            <Text className="text-gray-600 text-sm">Welcome back to PAMUSHIKA IN</Text>
          </View>

          <View className="bg-white rounded-2xl p-1 flex-row shadow-sm mb-6">
            <TouchableOpacity
              onPress={() => setMode("email")}
              className={`flex-1 py-3 rounded-xl items-center ${mode === "email" ? "bg-green-600" : ""}`}
            >
              <Text className={`text-sm font-semibold ${mode === "email" ? "text-white" : "text-gray-500"}`}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode("phone")}
              className={`flex-1 py-3 rounded-xl items-center ${mode === "phone" ? "bg-green-600" : ""}`}
            >
              <Text className={`text-sm font-semibold ${mode === "phone" ? "text-white" : "text-gray-500"}`}>Phone</Text>
            </TouchableOpacity>
          </View>

          {mode === "email" ? (
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

              <Button onPress={handleEmailSubmit} disabled={submitting} className={`mt-6 ${submitting ? "opacity-50" : ""}`}>
                {submitting ? "Signing in..." : "Sign In"}
              </Button>
            </View>
          ) : (
            <View className="gap-5">
              <View className="gap-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="+263 XXX XXX XXX"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  editable={!confirmation}
                />
              </View>

              {confirmation && (
                <View className="gap-2">
                  <Label>Verification Code</Label>
                  <Input
                    placeholder="123456"
                    value={code}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                  />
                </View>
              )}

              <Button
                onPress={confirmation ? handleVerifyCode : handleSendCode}
                disabled={submitting}
                className={`mt-6 ${submitting ? "opacity-50" : ""}`}
              >
                {submitting ? "Please wait..." : confirmation ? "Verify Code" : "Send Code"}
              </Button>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
