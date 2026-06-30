import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Checkbox } from "../components/ui/Checkbox";
import { ArrowLeft, Check } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";
import { createVendor } from "../services/vendors";

const STEPS = [
  "Business Info",
  "Location",
  "Products",
  "Photos",
  "Terms",
  "Subscription",
  "Payment",
];

const PRODUCT_CATEGORIES = [
  "Fruits", "Vegetables", "Indigenous Foods", "Organic Foods", "Herbs & Spices", "Grains & Cereals"
];

const SUBSCRIPTION_PLANS = [
  { name: "Starter", price: "$9.99/month", features: ["Up to 20 products", "Basic visibility"] },
  { name: "Growth", price: "$29.99/month", features: ["Up to 100 products", "Priority visibility"], popular: true },
  { name: "Premium", price: "$49.99/month", features: ["Unlimited products", "Featured listing", "Sponsored placement"] },
];

export default function VendorOnboarding({ navigation }: any) {
  const { signUpWithEmail } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", businessName: "", email: "", phone: "", nationalId: "", location: "",
    password: "",
    categories: [] as string[], termsAccepted: false, selectedPlan: "Growth" as "Starter" | "Growth" | "Premium",
  });

  const handleNext = async () => {
    if (currentStep === 0 && (!formData.fullName || !formData.businessName || !formData.email || !formData.password)) {
      Alert.alert("Missing details", "Full name, business name, email, and password are required.");
      return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setSubmitting(true);
    try {
      const profile = await signUpWithEmail({
        email: formData.email.trim(),
        password: formData.password,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim() || undefined,
        location: formData.location.trim() || undefined,
        userType: "vendor",
      });
      await createVendor({
        ownerFirebaseUid: profile.firebaseUid,
        name: formData.businessName.trim(),
        location: formData.location.trim() || "Not specified",
        categories: formData.categories,
        plan: formData.selectedPlan,
      });
      Alert.alert("Success", "Welcome to PAMUSHIKA IN!");
      // RootNavigator switches to VendorDashboard automatically once signed in.
    } catch (error: any) {
      Alert.alert("Couldn't finish setup", error?.message ?? "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    else navigation.goBack();
  };

  const toggleCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.includes(category)
        ? formData.categories.filter((c) => c !== category)
        : [...formData.categories, category],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        {/* Header */}
        <View className="px-4 py-4 border-b border-gray-100">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={handleBack} className="p-2 -ml-2">
              <ArrowLeft width={20} height={20} color="#111827" />
            </TouchableOpacity>
            <Text className="flex-1 text-center font-semibold text-gray-900">{STEPS[currentStep]}</Text>
            <View className="w-9" />
          </View>
          <View className="flex-row gap-1">
            {STEPS.map((_, index) => (
              <View key={index} className={`flex-1 h-1 rounded-full ${index <= currentStep ? "bg-green-600" : "bg-gray-200"}`} />
            ))}
          </View>
          <Text className="text-xs text-gray-500 text-center mt-2">Step {currentStep + 1} of {STEPS.length}</Text>
        </View>

        {/* Content */}
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
          {currentStep === 0 && (
            <View className="gap-4">
              <View className="gap-2"><Label>Full Name</Label><Input value={formData.fullName} onChangeText={(t) => setFormData({...formData, fullName: t})} placeholder="John Doe" /></View>
              <View className="gap-2"><Label>Business Name</Label><Input value={formData.businessName} onChangeText={(t) => setFormData({...formData, businessName: t})} placeholder="Fresh Produce Co." /></View>
              <View className="gap-2"><Label>Email</Label><Input value={formData.email} onChangeText={(t) => setFormData({...formData, email: t})} placeholder="business@email.com" keyboardType="email-address" /></View>
              <View className="gap-2"><Label>Phone Number</Label><Input value={formData.phone} onChangeText={(t) => setFormData({...formData, phone: t})} placeholder="+263 XXX XXX XXX" keyboardType="phone-pad" /></View>
              <View className="gap-2"><Label>Password</Label><Input value={formData.password} onChangeText={(t) => setFormData({...formData, password: t})} placeholder="••••••••" secureTextEntry /></View>
            </View>
          )}

          {currentStep === 1 && (
            <View className="gap-4">
              <View className="gap-2"><Label>Physical Location</Label><Input value={formData.location} onChangeText={(t) => setFormData({...formData, location: t})} placeholder="123 Market Street" /></View>
              <View className="bg-gray-100 rounded-lg h-48 items-center justify-center"><Text className="text-gray-500">Map view would appear here</Text></View>
            </View>
          )}

          {currentStep === 2 && (
            <View className="gap-4">
              <Label>Select product categories</Label>
              <View className="flex-row flex-wrap gap-3">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <TouchableOpacity key={cat} onPress={() => toggleCategory(cat)} className={`w-[47%] p-4 rounded-lg border-2 ${formData.categories.includes(cat) ? "border-green-600 bg-green-50" : "border-gray-200"}`}>
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className={`font-medium text-sm ${formData.categories.includes(cat) ? "text-green-700" : "text-gray-700"}`}>{cat}</Text>
                      {formData.categories.includes(cat) && <Check width={16} height={16} color="#16a34a" />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {currentStep === 3 && (
            <View className="gap-4">
              <Label>Upload photos</Label>
              <View className="flex-row flex-wrap gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <TouchableOpacity key={i} className="w-[47%] aspect-square rounded-lg border-2 border-dashed border-gray-300 items-center justify-center">
                    <Text className="text-3xl text-gray-400 mb-1">+</Text>
                    <Text className="text-xs text-gray-400">Add Photo</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {currentStep === 4 && (
            <View className="gap-4">
              <View className="bg-gray-50 rounded-lg p-4 h-64">
                <Text className="font-semibold text-gray-900 mb-2">Terms and Conditions</Text>
                <Text className="text-sm text-gray-700 mb-2">By using PAMUSHIKA IN as a vendor, you agree to:</Text>
                <Text className="text-sm text-gray-700">• Provide accurate product information</Text>
                <Text className="text-sm text-gray-700">• Maintain fresh, quality products</Text>
                <Text className="text-sm text-gray-700">• Respond to customer inquiries promptly</Text>
              </View>
              <View className="flex-row items-start gap-3 mt-2">
                <Checkbox checked={formData.termsAccepted} onCheckedChange={(c) => setFormData({...formData, termsAccepted: c})} />
                <Label className="flex-1">I have read and agree to the terms and conditions</Label>
              </View>
            </View>
          )}

          {currentStep === 5 && (
            <View className="gap-4">
              <Label>Choose your subscription plan</Label>
              <View className="gap-3">
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <TouchableOpacity key={plan.name} onPress={() => setFormData({...formData, selectedPlan: plan.name as typeof formData.selectedPlan})} className={`w-full p-4 rounded-lg border-2 relative ${formData.selectedPlan === plan.name ? "border-green-600 bg-green-50" : "border-gray-200"}`}>
                    {plan.popular && <View className="absolute -top-3 right-4 bg-yellow-400 px-2 py-1 rounded-full"><Text className="text-xs font-medium text-gray-900">Popular</Text></View>}
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="font-semibold text-gray-900">{plan.name}</Text>
                      <Text className="font-semibold text-green-600">{plan.price}</Text>
                    </View>
                    {plan.features.map((f, i) => (
                      <View key={i} className="flex-row items-center gap-2 mb-1">
                        <Check width={12} height={12} color="#16a34a" />
                        <Text className="text-sm text-gray-600">{f}</Text>
                      </View>
                    ))}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {currentStep === 6 && (
            <View className="gap-4">
              <View className="bg-green-50 rounded-lg p-4 border border-green-200">
                <Text className="font-semibold mb-2 text-gray-900">Selected Plan: {formData.selectedPlan}</Text>
                <Text className="text-2xl font-bold text-green-600">{SUBSCRIPTION_PLANS.find(p => p.name === formData.selectedPlan)?.price}</Text>
              </View>
              <Label>Payment Method</Label>
              <View className="gap-3">
                <TouchableOpacity className="w-full p-4 rounded-lg border-2 border-green-600 bg-green-50">
                  <Text className="font-medium text-gray-900">EcoCash</Text>
                  <Text className="text-sm text-gray-600">Pay with mobile money</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-full p-4 rounded-lg border-2 border-gray-200">
                  <Text className="font-medium text-gray-900">OneMoney</Text>
                  <Text className="text-sm text-gray-600">Pay with mobile money</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-full p-4 rounded-lg border-2 border-gray-200">
                  <Text className="font-medium text-gray-900">Credit Card</Text>
                  <Text className="text-sm text-gray-600">Visa, Mastercard</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        <View className="p-6 border-t border-gray-100">
          <Button
            onPress={handleNext}
            disabled={submitting || (currentStep === 4 && !formData.termsAccepted)}
            className={submitting || (currentStep === 4 && !formData.termsAccepted) ? "opacity-50" : ""}
          >
            {submitting ? "Setting up your account..." : currentStep === STEPS.length - 1 ? "Complete Payment" : "Continue"}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
