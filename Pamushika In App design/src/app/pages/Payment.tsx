import { useState } from "react";
import { ArrowLeft, CreditCard, Smartphone, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

interface PaymentProps {
  onBack: () => void;
  amount: string;
  description: string;
}

export default function Payment({ onBack, amount, description }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"paynow" | "ecocash" | "card">("paynow");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    if (paymentMethod !== "card" && !phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success("Payment successful!");
      onBack();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-bold text-lg">Payment</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Amount */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-8 mb-6">
        <div className="text-center">
          <p className="text-sm text-green-100 mb-2">Amount to Pay</p>
          <h2 className="text-5xl font-bold mb-3">{amount}</h2>
          <p className="text-sm text-green-100">{description}</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="px-4 space-y-4">
        <h3 className="font-bold text-gray-900 mb-3">Select Payment Method</h3>

        {/* Paynow */}
        <button
          onClick={() => setPaymentMethod("paynow")}
          className={`w-full p-4 rounded-2xl border-2 transition-all ${
            paymentMethod === "paynow"
              ? "border-green-600 bg-green-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-7 h-7 text-orange-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-gray-900">Paynow</h4>
              <p className="text-sm text-gray-600">All Zimbabwean mobile networks</p>
            </div>
            {paymentMethod === "paynow" && (
              <CheckCircle className="w-6 h-6 text-green-600 fill-current" />
            )}
          </div>
        </button>

        {/* EcoCash */}
        <button
          onClick={() => setPaymentMethod("ecocash")}
          className={`w-full p-4 rounded-2xl border-2 transition-all ${
            paymentMethod === "ecocash"
              ? "border-green-600 bg-green-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-7 h-7 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-gray-900">EcoCash</h4>
              <p className="text-sm text-gray-600">Mobile money payment</p>
            </div>
            {paymentMethod === "ecocash" && (
              <CheckCircle className="w-6 h-6 text-green-600 fill-current" />
            )}
          </div>
        </button>

        {/* Card */}
        <button
          onClick={() => setPaymentMethod("card")}
          className={`w-full p-4 rounded-2xl border-2 transition-all ${
            paymentMethod === "card"
              ? "border-green-600 bg-green-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-gray-900">Debit/Credit Card</h4>
              <p className="text-sm text-gray-600">Visa, Mastercard</p>
            </div>
            {paymentMethod === "card" && (
              <CheckCircle className="w-6 h-6 text-green-600 fill-current" />
            )}
          </div>
        </button>

        {/* Phone Number Input */}
        {(paymentMethod === "paynow" || paymentMethod === "ecocash") && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+263 XXX XXX XXX"
              className="h-12 rounded-xl"
            />
            <p className="text-xs text-gray-500">
              You'll receive a prompt on your phone to approve the payment
            </p>
          </div>
        )}

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={processing}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-base font-medium rounded-xl shadow-md mt-6"
        >
          {processing ? "Processing..." : `Pay ${amount}`}
        </Button>

        <p className="text-xs text-center text-gray-500 mt-4">
          Secure payment powered by Paynow
        </p>
      </div>
    </div>
  );
}
