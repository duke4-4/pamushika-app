import { useState } from "react";
import {
  MapPin, Leaf, MessageCircle, ShoppingBag,
  Package, Users, TrendingUp, Store,
  ArrowRight, Check, X,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface Slide {
  image: string;
  accent: string;
  iconBg: string;
  Icon: LucideIcon;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
}

const consumerSlides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1485637701894-09ad422f6de6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    accent: "from-green-600 to-green-800",
    iconBg: "bg-green-500",
    Icon: ShoppingBag,
    tag: "Welcome",
    title: "Fresh Produce,",
    subtitle: "Right at Your Door",
    description: "Discover the freshest fruits, vegetables, and indigenous African foods sourced directly from local vendors in your neighbourhood.",
  },
  {
    image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    accent: "from-yellow-500 to-yellow-700",
    iconBg: "bg-yellow-500",
    Icon: MapPin,
    tag: "Discover",
    title: "Find Vendors",
    subtitle: "Near You",
    description: "Browse an interactive map to find verified vendors close to you. Filter by distance, rating, and produce category.",
  },
  {
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    accent: "from-red-500 to-red-700",
    iconBg: "bg-red-500",
    Icon: Leaf,
    tag: "Stay Healthy",
    title: "Daily Tips for",
    subtitle: "Healthy Living",
    description: "Get personalised nutrition tips, recipes, and the health benefits of local African produce every single day.",
  },
  {
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    accent: "from-green-700 to-green-900",
    iconBg: "bg-green-600",
    Icon: MessageCircle,
    tag: "Connect",
    title: "Chat, Order &",
    subtitle: "Pay with Ease",
    description: "Message vendors directly, negotiate prices, and pay securely via PayNow — all inside the app.",
  },
];

const vendorSlides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1773070784326-461cca3a4db8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    accent: "from-green-600 to-green-800",
    iconBg: "bg-green-500",
    Icon: Store,
    tag: "Welcome Vendor",
    title: "Sell More,",
    subtitle: "Earn More",
    description: "Join hundreds of local vendors already using PAMUSHIKA IN to reach customers hungry for fresh, local produce.",
  },
  {
    image: "https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    accent: "from-yellow-500 to-yellow-700",
    iconBg: "bg-yellow-500",
    Icon: Package,
    tag: "Your Products",
    title: "List Products",
    subtitle: "in Minutes",
    description: "Add your fresh produce with photos, pricing, and stock levels. Post daily harvest updates to keep customers coming back.",
  },
  {
    image: "https://images.unsplash.com/photo-1758524055910-c69ce14d6078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    accent: "from-red-500 to-red-700",
    iconBg: "bg-red-500",
    Icon: Users,
    tag: "Get Discovered",
    title: "Reach Customers",
    subtitle: "All Around You",
    description: "Appear on the local map, get customer reviews, and grow your reputation in your community.",
  },
  {
    image: "https://images.unsplash.com/photo-1763358209320-d85bce1b19bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900",
    accent: "from-green-700 to-green-900",
    iconBg: "bg-green-600",
    Icon: TrendingUp,
    tag: "Grow",
    title: "Track Orders &",
    subtitle: "Grow Your Business",
    description: "Monitor sales, manage subscriptions, and get insights to help you build a thriving produce business.",
  },
];

interface WalkthroughProps {
  userType: "consumer" | "vendor";
  onComplete: () => void;
}

export default function Walkthrough({ userType, onComplete }: WalkthroughProps) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const slides = userType === "consumer" ? consumerSlides : vendorSlides;
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const goTo = (next: number) => {
    if (animating || next < 0 || next >= slides.length) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex(next);
      setAnimating(false);
    }, 220);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      goTo(index + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Skip */}
      <button
        onClick={onComplete}
        className="absolute top-12 right-5 z-30 flex items-center gap-1 px-3 py-1.5 bg-black/25 backdrop-blur-sm rounded-full"
      >
        <X className="w-3.5 h-3.5 text-white" />
        <span className="text-white text-xs font-semibold">Skip</span>
      </button>

      {/* Hero image */}
      <div
        className="relative flex-shrink-0"
        style={{
          height: "55vh",
          opacity: animating ? 0 : 1,
          transition: "opacity 0.22s ease",
        }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Tag badge */}
        <div className="absolute top-14 left-5">
          <div className={`${slide.iconBg} px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}>
            <slide.Icon className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-bold">{slide.tag}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 bg-white px-6 pt-7 pb-6 flex flex-col"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
        }}
      >
        {/* Accent bar */}
        <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${slide.accent} mb-5`} />

        <h2 className="font-extrabold text-gray-900 leading-tight mb-1" style={{ fontSize: "1.65rem" }}>
          {slide.title}
        </h2>
        <h2
          className={`font-extrabold leading-tight mb-3 ${
            slide.iconBg.includes("yellow") ? "text-yellow-600"
            : slide.iconBg.includes("red") ? "text-red-600"
            : "text-green-600"
          }`}
          style={{ fontSize: "1.65rem" }}
        >
          {slide.subtitle}
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed flex-1">
          {slide.description}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 h-2.5 bg-green-600"
                    : "w-2.5 h-2.5 bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Next / Done */}
          <button
            onClick={handleNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all ${
              isLast
                ? "bg-gradient-to-r from-green-600 to-green-700 text-white"
                : "bg-gray-900 text-white"
            }`}
          >
            {isLast ? (
              <>
                <Check className="w-4 h-4" />
                Get Started
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
