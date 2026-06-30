import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft } from "lucide-react";

interface RegisterProps {
  setAuth: (auth: boolean) => void;
  setUserType: (type: "consumer" | "vendor") => void;
  onBack: () => void;
}

export default function Register({ setAuth, setUserType, onBack }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setAuth(true);
    setUserType("consumer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="px-4 py-5 bg-white shadow-sm flex items-center">
        <button onClick={onBack} className="p-2 -ml-2 active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center font-bold text-xl text-gray-900">Create Account</h1>
        <div className="w-9" />
      </div>

      {/* Form */}
      <div className="px-6 py-6">
        <div className="mb-6 text-center">
          <p className="text-gray-600 text-sm">Join PAMUSHIKA IN today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="h-14 rounded-xl border-gray-300 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-14 rounded-xl border-gray-300 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+263 XXX XXX XXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="h-14 rounded-xl border-gray-300 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="Harare, Zimbabwe"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="h-14 rounded-xl border-gray-300 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="h-14 rounded-xl border-gray-300 text-base"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-base font-medium rounded-xl shadow-md mt-6"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}
