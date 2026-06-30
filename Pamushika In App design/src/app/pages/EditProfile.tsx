import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Phone, Mail, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

interface EditProfileProps {
  onBack: () => void;
  userType?: "consumer" | "vendor";
}

export default function EditProfile({ onBack, userType }: EditProfileProps) {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+263 777 123 456",
    location: "Harare, Zimbabwe",
    businessName: userType === "vendor" ? "Green Market Fresh" : "",
    bio: userType === "vendor" ? "Fresh organic produce delivered daily" : "",
  });

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-bold text-lg">Edit Profile</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Profile Photo */}
      <div className="bg-white px-4 py-6 mb-4">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-28 h-28 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {formData.fullName.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">Tap to change photo</p>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <div className="flex gap-2">
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-12 rounded-xl flex-1"
              />
              <button className="px-4 h-12 bg-green-600 text-white rounded-xl active:scale-95 transition-transform">
                <MapPin className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500">Enable location for personalized results</p>
          </div>
        </div>

        {userType === "vendor" && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900">Business Information</h3>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Business Name</Label>
              <Input
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Bio</Label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-xl resize-none"
                placeholder="Tell customers about your business..."
              />
            </div>
          </div>
        )}

        <Button
          onClick={handleSave}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-base font-medium rounded-xl shadow-md"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
