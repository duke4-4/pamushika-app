import { ArrowLeft, Leaf, Apple, ChefHat, Lightbulb, Flame, Trophy } from "lucide-react";
import { healthyLivingContent } from "../data/mockData";
import BottomNav from "../components/BottomNav";

interface HealthyLivingProps {
  onBack: () => void;
  activeTab?: string;
  onBottomNav?: (tab: string) => void;
}

export default function HealthyLiving({ onBack, activeTab = "home", onBottomNav }: HealthyLivingProps) {

  const getIcon = (type: string) => {
    switch (type) {
      case "fruit": return <Apple className="w-4 h-4" />;
      case "vegetable": return <Leaf className="w-4 h-4" />;
      case "recipe": return <ChefHat className="w-4 h-4" />;
      case "tip": return <Lightbulb className="w-4 h-4" />;
      default: return <Leaf className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "fruit": return "text-red-600 bg-red-50";
      case "vegetable": return "text-green-600 bg-green-50";
      case "recipe": return "text-yellow-600 bg-yellow-50";
      case "tip": return "text-blue-600 bg-blue-50";
      default: return "text-green-600 bg-green-50";
    }
  };

  const quickTips = [
    "Aim for at least 5 servings of fruits and vegetables daily",
    "Eat a rainbow of colors to get diverse nutrients",
    "Include indigenous African foods in your diet for traditional nutrients",
    "Buy fresh, seasonal produce from local vendors",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Hero header */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white px-5 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg flex-1">Healthy Living</h1>
          <div className="w-9" />
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
            <Leaf className="w-8 h-8" />
          </div>
          <h2 className="font-extrabold text-xl mb-1">Your Daily Nutrition Guide</h2>
          <p className="text-green-200 text-sm">Benefits of fruits, vegetables & indigenous foods</p>
        </div>
      </div>

      {/* Streak Banner */}
      <div className="mx-5 -mt-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg z-10 relative">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Flame className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-white text-sm flex items-center gap-1.5">
              <Trophy className="w-4 h-4" /> 7-Day Healthy Streak!
            </div>
          <div className="text-yellow-100 text-xs">You're on a roll — keep it up!</div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 space-y-4 mt-2">
        {healthyLivingContent.map((content) => (
          <div
            key={content.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 active:scale-98 transition-transform"
          >
            <div className="aspect-video bg-gray-100 relative">
              <img
                src={content.image}
                alt={content.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${getColor(content.type)} bg-opacity-90`}>
                {getIcon(content.type)}
                <span className="capitalize">{content.type.replace("-", " ")}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1.5">{content.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{content.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="mx-5 mb-4 bg-white rounded-2xl p-5 shadow-sm border border-yellow-100">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-7 h-7 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-yellow-600" />
          </div>
          Quick Health Tips
        </h3>
        <div className="space-y-3">
          {quickTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {onBottomNav && (
        <BottomNav activeTab={activeTab} onNavigate={onBottomNav} userType="consumer" />
      )}
    </div>
  );
}
