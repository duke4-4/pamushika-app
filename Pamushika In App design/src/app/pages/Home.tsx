import { useState } from "react";
import { Search, MapPin, Leaf, Bell, Star, Shield, Phone, User, ChevronRight, Sparkles, LayoutGrid, Apple, Wheat, Sprout } from "lucide-react";
import { mockVendors } from "../data/mockData";
import VendorProfile from "./VendorProfile";
import NearbyVendors from "./NearbyVendors";
import HealthyLiving from "./HealthyLiving";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Messaging from "./Messaging";
import SearchPage from "./Search";
import Favorites from "./Favorites";
import BottomNav from "../components/BottomNav";
import HealthyTipsCarousel from "../components/HealthyTipsCarousel";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [messagingVendor, setMessagingVendor] = useState<{ name: string; id: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const nearbyVendors = mockVendors.slice(0, 6);
  const categories = [
    { name: "All", Icon: LayoutGrid },
    { name: "Fruits", Icon: Apple },
    { name: "Vegetables", Icon: Leaf },
    { name: "Indigenous", Icon: Wheat },
    { name: "Organic", Icon: Sprout },
  ];

  const handleBottomNav = (tab: string) => {
    setActiveTab(tab);
    if (tab === "profile") setSelectedPage("profile");
    else if (tab === "home") setSelectedPage(null);
    else if (tab === "search") setSelectedPage("search");
    else if (tab === "favorites") setSelectedPage("favorites");
  };

  if (selectedPage === "vendor-profile" && selectedVendorId) {
    return (
      <VendorProfile
        vendorId={selectedVendorId}
        onBack={() => setSelectedPage(null)}
        onMessage={(name, id) => {
          setMessagingVendor({ name, id });
          setSelectedPage("messaging");
        }}
        activeTab={activeTab}
        onBottomNav={handleBottomNav}
      />
    );
  }

  if (selectedPage === "nearby-vendors") {
    return (
      <NearbyVendors
        onBack={() => setSelectedPage(null)}
        onSelectVendor={(id) => {
          setSelectedVendorId(id);
          setSelectedPage("vendor-profile");
        }}
        onMessage={(name, id) => {
          setMessagingVendor({ name, id });
          setSelectedPage("messaging");
        }}
        activeTab={activeTab}
        onBottomNav={handleBottomNav}
      />
    );
  }

  if (selectedPage === "healthy-living") {
    return (
      <HealthyLiving
        onBack={() => setSelectedPage(null)}
        activeTab={activeTab}
        onBottomNav={handleBottomNav}
      />
    );
  }

  if (selectedPage === "profile") {
    return (
      <Profile
        onBack={() => setSelectedPage(null)}
        onEditProfile={() => setSelectedPage("edit-profile")}
        activeTab="profile"
        onBottomNav={handleBottomNav}
      />
    );
  }

  if (selectedPage === "edit-profile") {
    return <EditProfile onBack={() => setSelectedPage("profile")} userType="consumer" />;
  }

  if (selectedPage === "messaging" && messagingVendor) {
    return (
      <Messaging
        onBack={() => setSelectedPage(null)}
        vendorName={messagingVendor.name}
        vendorId={messagingVendor.id}
      />
    );
  }

  if (selectedPage === "search") {
    return (
      <SearchPage
        onBack={() => setSelectedPage(null)}
        activeTab="search"
        onBottomNav={handleBottomNav}
      />
    );
  }

  if (selectedPage === "favorites") {
    return (
      <Favorites
        onBack={() => setSelectedPage(null)}
        activeTab="favorites"
        onBottomNav={handleBottomNav}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white px-5 pt-12 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-1.5 text-green-200 text-xs mb-1">
              <MapPin className="w-3 h-3" />
              <span>Harare, Zimbabwe</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">PAMUSHIKA IN</h1>
            <p className="text-green-200 text-xs mt-0.5">Fresh produce at your doorstep</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center active:scale-90 transition-transform border border-white/20">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedPage("edit-profile")}
              className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center active:scale-90 transition-transform border border-white/20"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <button
          onClick={() => { setSelectedPage("search"); setActiveTab("search"); }}
          className="w-full bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-lg active:scale-98 transition-transform"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 flex-1 text-sm text-left">Search for fresh produce...</span>
          <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>

      {/* Category Pills */}
      <div className="px-5 py-3 bg-white shadow-sm overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 w-max">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
                activeCategory === cat.name
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <cat.Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Tips Carousel */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900">Daily Health Tips</h2>
          <button
            onClick={() => setSelectedPage("healthy-living")}
            className="text-xs text-green-600 font-semibold flex items-center gap-0.5"
          >
            See all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <HealthyTipsCarousel />
      </div>

      {/* Quick Actions */}
      <div className="px-5 pb-4 grid grid-cols-3 gap-3">
        <button
          onClick={() => setSelectedPage("nearby-vendors")}
          className="relative bg-gradient-to-br from-green-500 to-green-700 text-white p-4 rounded-2xl text-center shadow-lg active:scale-95 transition-transform overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -translate-y-3 translate-x-3" />
          <MapPin className="w-6 h-6 mx-auto mb-2 relative z-10" />
          <div className="text-xs font-semibold leading-tight relative z-10">Find<br/>Vendors</div>
        </button>
        <button
          onClick={() => setSelectedPage("healthy-living")}
          className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-4 rounded-2xl text-center shadow-lg active:scale-95 transition-transform overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -translate-y-3 translate-x-3" />
          <Leaf className="w-6 h-6 mx-auto mb-2 relative z-10" />
          <div className="text-xs font-semibold leading-tight relative z-10">Healthy<br/>Living</div>
        </button>
        <button
          onClick={() => { setActiveTab("favorites"); setSelectedPage("favorites"); }}
          className="relative bg-gradient-to-br from-red-500 to-red-700 text-white p-4 rounded-2xl text-center shadow-lg active:scale-95 transition-transform overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -translate-y-3 translate-x-3" />
          <Star className="w-6 h-6 mx-auto mb-2 relative z-10" />
          <div className="text-xs font-semibold leading-tight relative z-10">My<br/>Favorites</div>
        </button>
      </div>

      {/* Vendors Near You */}
      <div className="flex-1 px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900">Vendors Near You</h2>
          <button
            onClick={() => setSelectedPage("nearby-vendors")}
            className="text-xs text-green-600 font-semibold flex items-center gap-0.5"
          >
            View map <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3 pb-4">
          {nearbyVendors.map((vendor) => (
            <div
              key={vendor.id}
              onClick={() => {
                setSelectedVendorId(vendor.id);
                setSelectedPage("vendor-profile");
              }}
              className="bg-white rounded-2xl p-4 cursor-pointer active:scale-98 transition-transform shadow-sm border border-gray-100"
            >
              <div className="flex gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-md">
                  {vendor.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{vendor.name}</h3>
                    {vendor.verified && (
                      <Shield className="w-3.5 h-3.5 text-green-600 fill-current flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{vendor.location}</span>
                    <span className="mx-1 text-gray-300">|</span>
                    <span className="text-green-600 font-semibold">{vendor.distance}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-xs text-gray-800">{vendor.rating}</span>
                      <span className="text-xs text-gray-400">({vendor.reviewCount})</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMessagingVendor({ name: vendor.name, id: vendor.id });
                        setSelectedPage("messaging");
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-full text-xs font-semibold active:scale-95 transition-transform shadow-sm"
                    >
                      <Phone className="w-3 h-3" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-1.5 mt-3 flex-wrap">
                {vendor.categories.slice(0, 3).map((category) => (
                  <span
                    key={category}
                    className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                  >
                    {category}
                  </span>
                ))}
                {vendor.categories.length > 3 && (
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                    +{vendor.categories.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={handleBottomNav}
        userType="consumer"
      />
    </div>
  );
}
