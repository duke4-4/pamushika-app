import { ArrowLeft, User, MapPin, Bell, Heart, HelpCircle, Settings, LogOut, ChevronRight, Shield, Star } from "lucide-react";
import BottomNav from "../components/BottomNav";

interface ProfileProps {
  onBack: () => void;
  onEditProfile?: () => void;
  activeTab?: string;
  onBottomNav?: (tab: string) => void;
}

export default function Profile({ onBack, onEditProfile, activeTab = "profile", onBottomNav }: ProfileProps) {
  const menuItems = [
    { icon: User, label: "Edit Profile", color: "text-green-600 bg-green-50", onClick: onEditProfile || (() => {}) },
    { icon: MapPin, label: "Saved Addresses", color: "text-blue-600 bg-blue-50", onClick: () => {} },
    { icon: Heart, label: "My Favorites", color: "text-red-500 bg-red-50", onClick: () => {} },
    { icon: Bell, label: "Notifications", color: "text-yellow-600 bg-yellow-50", onClick: () => {} },
    { icon: Settings, label: "Settings", color: "text-gray-600 bg-gray-100", onClick: () => {} },
    { icon: HelpCircle, label: "Help & Support", color: "text-purple-600 bg-purple-50", onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white px-5 pt-12 pb-8">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-bold text-lg">My Profile</h1>
          <div className="w-9" />
        </div>

        {/* Avatar + Info */}
        <div className="text-center">
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-extrabold mb-3 border-4 border-white/30 shadow-xl">
            JD
          </div>
          <h2 className="font-bold text-xl mb-0.5">John Doe</h2>
          <p className="text-green-200 text-sm mb-1">john.doe@email.com</p>
          <div className="flex items-center justify-center gap-1 text-green-200 text-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>Harare, Zimbabwe</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 -mt-5 bg-white rounded-2xl shadow-lg p-4 grid grid-cols-3 divide-x divide-gray-100">
        <div className="text-center pr-4">
          <div className="font-extrabold text-xl text-green-600">24</div>
          <div className="text-xs text-gray-500 mt-0.5">Orders</div>
        </div>
        <div className="text-center px-4">
          <div className="font-extrabold text-xl text-red-500">12</div>
          <div className="text-xs text-gray-500 mt-0.5">Favorites</div>
        </div>
        <div className="text-center pl-4">
          <div className="font-extrabold text-xl text-yellow-500">156</div>
          <div className="text-xs text-gray-500 mt-0.5">Points</div>
        </div>
      </div>

      {/* Loyalty Badge */}
      <div className="mx-5 mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-md">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Star className="w-5 h-5 text-white fill-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-sm">Gold Member</div>
          <div className="text-yellow-100 text-xs">44 more points to Platinum</div>
        </div>
        <Shield className="w-5 h-5 text-white/70" />
      </div>

      {/* Menu Items */}
      <div className="mx-5 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`w-full flex items-center gap-4 px-4 py-3.5 active:bg-gray-50 transition-colors ${
              index < menuItems.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
              <item.icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
            </div>
            <span className="flex-1 text-left font-semibold text-gray-800 text-sm">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-5 mt-4 mb-2">
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-red-100 bg-red-50 text-red-600 rounded-2xl font-bold active:scale-98 transition-transform"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>

      <div className="text-center text-xs text-gray-400 pb-4">
        PAMUSHIKA IN v1.0 · Empowering healthy eating
      </div>

      {onBottomNav && (
        <BottomNav activeTab={activeTab} onNavigate={onBottomNav} userType="consumer" />
      )}
    </div>
  );
}
