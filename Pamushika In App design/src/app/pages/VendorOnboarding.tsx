import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

interface VendorOnboardingProps {
  setAuth: (auth: boolean) => void;
  setUserType: (type: "consumer" | "vendor") => void;
}

const STEPS = [
  "Business Information",
  "Location Verification",
  "Products Sold",
  "Business Photos",
  "Terms and Conditions",
  "Subscription Selection",
  "Payment",
];

const PRODUCT_CATEGORIES = [
  "Fruits",
  "Vegetables",
  "Indigenous Foods",
  "Organic Foods",
  "Herbs & Spices",
  "Grains & Cereals",
];

const SUBSCRIPTION_PLANS = [
  {
    name: "Starter",
    price: "$9.99/month",
    features: ["Up to 20 products", "Basic visibility"],
  },
  {
    name: "Growth",
    price: "$29.99/month",
    features: ["Up to 100 products", "Priority visibility"],
    popular: true,
  },
  {
    name: "Premium",
    price: "$49.99/month",
    features: ["Unlimited products", "Featured listing", "Sponsored placement"],
  },
];

export default function VendorOnboarding({ setAuth, setUserType }: VendorOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    nationalId: "",
    location: "",
    categories: [] as string[],
    termsAccepted: false,
    selectedPlan: "Growth",
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      setAuth(true);
      setUserType("vendor");
      toast.success("Welcome to PAMUSHIKA IN!");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b">
        <div className="flex items-center mb-4">
          <button onClick={handleBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-semibold">{STEPS[currentStep]}</h1>
          <div className="w-9" />
        </div>

        {/* Progress */}
        <div className="flex gap-1">
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full ${
                index <= currentStep ? "bg-green-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Step {currentStep + 1} of {STEPS.length}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Step 1: Business Information */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Fresh Produce Co."
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="business@email.com"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+263 XXX XXX XXX"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label>National ID (Optional)</Label>
              <Input
                value={formData.nationalId}
                onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                placeholder="XX-XXXXXXX-X-XX"
                className="h-12"
              />
            </div>
          </div>
        )}

        {/* Step 2: Location Verification */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Physical Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="123 Market Street, Harare"
                className="h-12"
              />
            </div>
            <div className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center text-gray-500">
              Map view would appear here
            </div>
            <p className="text-sm text-gray-600">
              This helps customers find you. Make sure your location is accurate.
            </p>
          </div>
        )}

        {/* Step 3: Products Sold */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <Label>Select product categories you sell</Label>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    formData.categories.includes(category)
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{category}</span>
                    {formData.categories.includes(category) && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Business Photos */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <Label>Upload photos of your business and products</Label>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 cursor-pointer hover:border-green-600 hover:text-green-600 transition-colors"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-1">+</div>
                    <div className="text-xs">Add Photo</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Quality photos help attract more customers
            </p>
          </div>
        )}

        {/* Step 5: Terms and Conditions */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto text-sm text-gray-700 space-y-2">
              <h3 className="font-semibold">Terms and Conditions</h3>
              <p>By using PAMUSHIKA IN as a vendor, you agree to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide accurate product information and pricing</li>
                <li>Maintain fresh, quality products</li>
                <li>Respond to customer inquiries promptly</li>
                <li>Comply with local food safety regulations</li>
                <li>Pay subscription fees on time</li>
                <li>Accept customer ratings and reviews</li>
              </ul>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, termsAccepted: checked as boolean })
                }
              />
              <Label htmlFor="terms" className="text-sm">
                I have read and agree to the terms and conditions
              </Label>
            </div>
          </div>
        )}

        {/* Step 6: Subscription Selection */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <Label>Choose your subscription plan</Label>
            <div className="space-y-3">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => setFormData({ ...formData, selectedPlan: plan.name })}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-colors relative ${
                    formData.selectedPlan === plan.name
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 right-4 bg-yellow-400 text-xs px-2 py-1 rounded-full font-medium">
                      Popular
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <span className="font-semibold text-green-600">{plan.price}</span>
                  </div>
                  <ul className="space-y-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Payment */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold mb-2">Selected Plan: {formData.selectedPlan}</h3>
              <p className="text-2xl font-bold text-green-600">
                {SUBSCRIPTION_PLANS.find((p) => p.name === formData.selectedPlan)?.price}
              </p>
            </div>

            <Label>Payment Method</Label>
            <div className="space-y-3">
              <button className="w-full p-4 rounded-lg border-2 border-green-600 bg-green-50 text-left">
                <div className="font-medium">EcoCash</div>
                <div className="text-sm text-gray-600">Pay with mobile money</div>
              </button>
              <button className="w-full p-4 rounded-lg border-2 border-gray-200 text-left">
                <div className="font-medium">OneMoney</div>
                <div className="text-sm text-gray-600">Pay with mobile money</div>
              </button>
              <button className="w-full p-4 rounded-lg border-2 border-gray-200 text-left">
                <div className="font-medium">Credit Card</div>
                <div className="text-sm text-gray-600">Visa, Mastercard</div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t">
        <Button
          onClick={handleNext}
          disabled={currentStep === 4 && !formData.termsAccepted}
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300"
        >
          {currentStep === STEPS.length - 1 ? "Complete Payment" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
