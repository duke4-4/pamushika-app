import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Camera, Mail, MapPin, Phone, Store, User } from "lucide-react-native";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { useAuth } from "../context/AuthContext";
import { useAsync } from "../hooks/useAsync";
import { fetchVendorByOwner, updateVendor } from "../services/vendors";

export default function EditProfile({ navigation }: any) {
  const { user, profile, updateProfile } = useAuth();
  const isVendor = profile?.userType === "vendor";
  const [submitting, setSubmitting] = useState(false);

  const { data: vendor } = useAsync(
    () => (isVendor && user ? fetchVendorByOwner(user.uid) : Promise.resolve(null)),
    [isVendor, user?.uid]
  );

  const [formData, setFormData] = useState({
    fullName: profile?.fullName ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    location: profile?.location ?? "",
    businessName: "",
  });

  useEffect(() => {
    if (vendor) setFormData((prev) => ({ ...prev, businessName: vendor.name }));
  }, [vendor?.name]);

  const initial = (formData.fullName || profile?.fullName || "?").charAt(0).toUpperCase();

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      Alert.alert("Required", "Full name cannot be empty.");
      return;
    }
    setSubmitting(true);
    try {
      await updateProfile({
        fullName: formData.fullName.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim() || null,
        location: formData.location.trim() || null,
      });
      if (isVendor && vendor && formData.businessName.trim()) {
        await updateVendor(vendor.id, { name: formData.businessName.trim() });
      }
      Alert.alert("Saved", "Your profile has been updated.");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Couldn't save", error?.message ?? "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "bottom"]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        {/* Header */}
        <View className="bg-white px-4 py-4 flex-row items-center border-b border-gray-100">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
            <ArrowLeft width={20} height={20} color="#111827" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-bold text-lg text-gray-900">Edit Profile</Text>
          <View className="w-9" />
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
          {/* Avatar */}
          <View className="bg-white rounded-2xl p-6 mb-4 items-center">
            <View className="relative">
              <View className="w-28 h-28 rounded-full bg-green-600 items-center justify-center shadow-lg">
                <Text className="text-white text-4xl font-bold">{initial}</Text>
              </View>
              <View className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 rounded-full items-center justify-center shadow">
                <Camera width={20} height={20} color="white" />
              </View>
            </View>
            <Text className="text-sm text-gray-500 mt-3">Profile photo (coming soon)</Text>
          </View>

          {/* Personal info */}
          <View className="bg-white rounded-2xl p-4 mb-4 gap-4">
            <View className="gap-2">
              <Label>
                <View className="flex-row items-center gap-2">
                  <User width={15} height={15} color="#374151" />
                  <Text className="text-sm font-medium text-gray-700">Full Name</Text>
                </View>
              </Label>
              <Input
                value={formData.fullName}
                onChangeText={(t) => setFormData({ ...formData, fullName: t })}
                placeholder="Your full name"
              />
            </View>

            <View className="gap-2">
              <Label>
                <View className="flex-row items-center gap-2">
                  <Mail width={15} height={15} color="#374151" />
                  <Text className="text-sm font-medium text-gray-700">Email</Text>
                </View>
              </Label>
              <Input
                value={formData.email}
                onChangeText={(t) => setFormData({ ...formData, email: t })}
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="gap-2">
              <Label>
                <View className="flex-row items-center gap-2">
                  <Phone width={15} height={15} color="#374151" />
                  <Text className="text-sm font-medium text-gray-700">Phone Number</Text>
                </View>
              </Label>
              <Input
                value={formData.phone}
                onChangeText={(t) => setFormData({ ...formData, phone: t })}
                placeholder="+263 XXX XXX XXX"
                keyboardType="phone-pad"
              />
            </View>

            <View className="gap-2">
              <Label>
                <View className="flex-row items-center gap-2">
                  <MapPin width={15} height={15} color="#374151" />
                  <Text className="text-sm font-medium text-gray-700">Location</Text>
                </View>
              </Label>
              <Input
                value={formData.location}
                onChangeText={(t) => setFormData({ ...formData, location: t })}
                placeholder="e.g. Harare, Zimbabwe"
              />
              <Text className="text-xs text-gray-400">Used to show you nearby vendors</Text>
            </View>
          </View>

          {/* Vendor: business info */}
          {isVendor && (
            <View className="bg-white rounded-2xl p-4 mb-4 gap-4">
              <Text className="font-bold text-gray-900">Business Information</Text>
              <View className="gap-2">
                <Label>
                  <View className="flex-row items-center gap-2">
                    <Store width={15} height={15} color="#374151" />
                    <Text className="text-sm font-medium text-gray-700">Business Name</Text>
                  </View>
                </Label>
                <Input
                  value={formData.businessName}
                  onChangeText={(t) => setFormData({ ...formData, businessName: t })}
                  placeholder="Your market / farm name"
                />
              </View>
            </View>
          )}

          <Button
            onPress={handleSave}
            disabled={submitting}
            className={submitting ? "opacity-50" : ""}
          >
            {submitting ? "Saving…" : "Save Changes"}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
