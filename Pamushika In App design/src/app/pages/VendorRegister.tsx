import { Button } from "../components/ui/button";
import { Store, CheckCircle, ArrowLeft } from "lucide-react";

interface VendorRegisterProps {
  onGetStarted: () => void;
  onBack: () => void;
}

export default function VendorRegister({ onGetStarted, onBack }: VendorRegisterProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 py-5 bg-white shadow-sm flex items-center">
        <button onClick={onBack} className="p-2 -ml-2 active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center font-bold text-xl text-gray-900">Become a Vendor</h1>
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Store className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold">Grow Your Business</h2>
          <p className="text-gray-600">
            Join PAMUSHIKA IN and reach thousands of customers looking for fresh, healthy produce
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium">Digital Storefront</h3>
              <p className="text-sm text-gray-600">Get your own online presence</p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium">Customer Ratings</h3>
              <p className="text-sm text-gray-600">Build trust and credibility</p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium">Location-Based Discovery</h3>
              <p className="text-sm text-gray-600">Be found by nearby customers</p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium">Business Analytics</h3>
              <p className="text-sm text-gray-600">Track your sales and performance</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button
            onClick={onGetStarted}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-base font-medium rounded-xl shadow-md"
          >
            Get Started
          </Button>

          <Button
            onClick={onBack}
            variant="outline"
            className="w-full h-14 text-base font-medium rounded-xl"
          >
            I already have an account
          </Button>
        </div>
      </div>
    </div>
  );
}
