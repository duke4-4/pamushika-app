import { useState } from "react";
import { ArrowLeft, MapPin, Star, Shield, Navigation, Phone, MessageCircle } from "lucide-react";
import { mockVendors } from "../data/mockData";
import BottomNav from "../components/BottomNav";

interface NearbyVendorsProps {
  onBack: () => void;
  onSelectVendor: (vendorId: string) => void;
  onMessage?: (vendorName: string, vendorId: string) => void;
  activeTab?: string;
  onBottomNav?: (tab: string) => void;
}

export default function NearbyVendors({ onBack, onSelectVendor, onMessage, activeTab = "home", onBottomNav }: NearbyVendorsProps) {
  const [sortBy, setSortBy] = useState<"distance" | "rating">("distance");
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const sortedVendors = [...mockVendors].sort((a, b) => {
    if (sortBy === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
    return b.rating - a.rating;
  });

  const selectedVendorData = selectedVendor ? mockVendors.find(v => v.id === selectedVendor) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="font-bold text-gray-900 text-lg flex-1">Nearby Vendors</h1>
          <div className="px-3 py-1.5 bg-green-50 rounded-full">
            <span className="text-xs font-bold text-green-700">{sortedVendors.length} vendors</span>
          </div>
        </div>

        {/* Sort toggle */}
        <div className="flex bg-gray-100 rounded-2xl p-1">
          <button
            onClick={() => setSortBy("distance")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              sortBy === "distance" ? "bg-green-600 text-white shadow-md" : "text-gray-500"
            }`}
          >
            Nearest First
          </button>
          <button
            onClick={() => setSortBy("rating")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              sortBy === "rating" ? "bg-green-600 text-white shadow-md" : "text-gray-500"
            }`}
          >
            Top Rated
          </button>
        </div>
      </div>

      {/* Map View */}
      <div className="relative h-64 bg-gradient-to-br from-green-50 to-emerald-100 border-b border-gray-200">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #6b7280 0px, #6b7280 1px, transparent 1px, transparent 36px),
                             repeating-linear-gradient(90deg, #6b7280 0px, #6b7280 1px, transparent 1px, transparent 36px)`
          }}
        />

        <div className="relative h-full">
          {sortedVendors.slice(0, 5).map((vendor, index) => (
            <button
              key={vendor.id}
              onClick={() => setSelectedVendor(selectedVendor === vendor.id ? null : vendor.id)}
              className={`absolute transition-all active:scale-90 ${
                selectedVendor === vendor.id ? 'z-20' : 'z-10'
              }`}
              style={{
                left: `${15 + index * 17}%`,
                top: `${25 + (index % 3) * 22}%`
              }}
            >
              <div className={`relative transition-transform ${selectedVendor === vendor.id ? 'scale-125' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white ${
                  selectedVendor === vendor.id ? 'bg-red-500' : 'bg-green-600'
                }`}>
                  {vendor.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-current"
                  style={{ borderTopColor: selectedVendor === vendor.id ? '#ef4444' : '#16a34a' }}
                />
                {selectedVendor === vendor.id && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md text-xs font-bold whitespace-nowrap text-gray-800">
                    {vendor.distance}
                  </div>
                )}
              </div>
            </button>
          ))}

          {/* You marker */}
          <div className="absolute bottom-6 right-6">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-xl border-3 border-white animate-pulse">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md whitespace-nowrap">
                You
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick card if vendor selected */}
      {selectedVendorData && (
        <div className="mx-4 -mt-4 bg-white rounded-2xl shadow-xl p-4 z-20 relative border border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md">
              {selectedVendorData.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-bold text-gray-900 text-sm">{selectedVendorData.name}</span>
                {selectedVendorData.verified && <Shield className="w-3.5 h-3.5 text-green-600 fill-current" />}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{selectedVendorData.rating}</span>
                <span className="text-green-600 font-bold">· {selectedVendorData.distance}</span>
              </div>
            </div>
            <button
              onClick={() => onSelectVendor(selectedVendorData.id)}
              className="px-3 py-2 bg-green-600 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform"
            >
              View
            </button>
          </div>
        </div>
      )}

      {/* Vendors List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {sortedVendors.map((vendor) => (
            <div
              key={vendor.id}
              className={`bg-white rounded-2xl p-4 transition-all shadow-sm border ${
                selectedVendor === vendor.id ? 'border-green-400 shadow-lg' : 'border-gray-100'
              }`}
            >
              <div className="flex gap-3 mb-3">
                <button
                  onClick={() => setSelectedVendor(selectedVendor === vendor.id ? null : vendor.id)}
                  className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-md active:scale-95 transition-transform"
                >
                  {vendor.name.charAt(0)}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{vendor.name}</h3>
                    {vendor.verified && <Shield className="w-3.5 h-3.5 text-green-600 fill-current flex-shrink-0" />}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{vendor.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-800">{vendor.rating}</span>
                      <span className="text-gray-400">({vendor.reviewCount})</span>
                    </div>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-bold">{vendor.distance}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button className="flex items-center justify-center gap-1.5 py-2.5 bg-green-600 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </button>
                <button
                  onClick={() => onMessage?.(vendor.name, vendor.id)}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Message
                </button>
                <button
                  onClick={() => onSelectVendor(vendor.id)}
                  className="flex items-center justify-center py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl text-xs font-bold active:scale-95 transition-transform"
                >
                  Profile
                </button>
              </div>
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
