import { ArrowLeft, Check, Crown, Zap, Star } from "lucide-react";
import { Button } from "../components/ui/button";

interface VendorSubscriptionProps {
  onBack: () => void;
}

export default function VendorSubscription({ onBack }: VendorSubscriptionProps) {

  const plans = [
    {
      name: "Starter",
      price: "$9.99",
      icon: Zap,
      color: "text-gray-600 bg-gray-100",
      features: [
        "Up to 20 products",
        "Basic visibility",
        "Standard support",
        "Basic analytics",
      ],
    },
    {
      name: "Growth",
      price: "$29.99",
      icon: Star,
      color: "text-yellow-600 bg-yellow-100",
      features: [
        "Up to 100 products",
        "Priority visibility",
        "Priority support",
        "Advanced analytics",
        "Featured in search",
      ],
      current: true,
      popular: true,
    },
    {
      name: "Premium",
      price: "$49.99",
      icon: Crown,
      color: "text-green-600 bg-green-100",
      features: [
        "Unlimited products",
        "Featured listing",
        "Sponsored placement",
        "Premium support",
        "Full analytics suite",
        "Marketing tools",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-semibold">Subscription</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-6 py-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold mb-2">Current Plan: Growth</h2>
          <p className="text-green-100 text-sm">Next billing: June 30, 2026</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">47</div>
            <div className="text-xs text-green-100 mt-1">Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">156</div>
            <div className="text-xs text-green-100 mt-1">Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-xs text-green-100 mt-1">Rating</div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="px-4 py-6 space-y-4">
        <h3 className="font-semibold text-lg">Available Plans</h3>

        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border-2 rounded-xl p-5 relative ${
              plan.current ? "border-green-600 bg-green-50" : "border-gray-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-xs px-3 py-1 rounded-full font-medium">
                Most Popular
              </div>
            )}

            {plan.current && (
              <div className="absolute -top-3 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                Current Plan
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full ${plan.color} flex items-center justify-center`}>
                <plan.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">{plan.name}</h4>
                <p className="text-2xl font-bold text-green-600">
                  {plan.price}
                  <span className="text-sm text-gray-500 font-normal">/month</span>
                </p>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {!plan.current && (
              <Button
                className={`w-full h-12 ${
                  plan.name === "Premium"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-600 hover:bg-gray-700"
                } text-white`}
              >
                {plan.name === "Starter" ? "Downgrade" : "Upgrade"} to {plan.name}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Payment History */}
      <div className="px-4 pb-6">
        <h3 className="font-semibold text-lg mb-4">Payment History</h3>

        <div className="bg-white border border-gray-200 rounded-xl divide-y">
          {[
            { date: "May 2026", amount: "$29.99", status: "Paid" },
            { date: "Apr 2026", amount: "$29.99", status: "Paid" },
            { date: "Mar 2026", amount: "$29.99", status: "Paid" },
          ].map((payment, index) => (
            <div key={index} className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium">{payment.date}</div>
                <div className="text-sm text-gray-500">Growth Plan</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">{payment.amount}</div>
                <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full inline-block mt-1">
                  {payment.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
