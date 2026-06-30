import { Home, Search, Heart, User, Store, FileText } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onNavigate: (page: string) => void;
  userType?: "consumer" | "vendor";
}

export default function BottomNav({ activeTab, onNavigate, userType }: BottomNavProps) {
  const consumerTabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "favorites", icon: Heart, label: "Saved" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const vendorTabs = [
    { id: "vendor-dashboard", icon: Home, label: "Dashboard" },
    { id: "vendor-products", icon: Store, label: "Products" },
    { id: "vendor-posts", icon: FileText, label: "Posts" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const tabs = userType === "vendor" ? vendorTabs : consumerTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
      <div className="mx-3 mb-3 bg-white rounded-2xl shadow-xl border border-gray-100 px-2 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all active:scale-90 ${
                  isActive
                    ? "text-white bg-green-600 shadow-md"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
