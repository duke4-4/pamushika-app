import { ArrowLeft, MapPin, Star, Phone, Shield, MessageCircle, Navigation, Clock, Heart } from "lucide-react";
import { mockVendors, mockProducts } from "../data/mockData";
import BottomNav from "../components/BottomNav";

interface VendorProfileProps {
  vendorId: string;
  onBack: () => void;
  onMessage?: (vendorName: string, vendorId: string) => void;
  activeTab?: string;
  onBottomNav?: (tab: string) => void;
}

export default function VendorProfile({ vendorId, onBack, onMessage, activeTab = "home", onBottomNav }: VendorProfileProps) {
  const vendor = mockVendors.find((v) => v.id === vendorId);
  const vendorProducts = mockProducts.filter((p) => p.vendorId === vendorId);

  if (!vendor) return <div>Vendor not found</div>;

  const reviews = [
    { name: "Sarah M.", rating: 5, comment: "Fresh produce and excellent service! Highly recommended.", date: "2 days ago", avatar: "S" },
    { name: "John D.", rating: 4, comment: "Good quality products, will order again.", date: "1 week ago", avatar: "J" },
    { name: "Grace K.", rating: 5, comment: "Best vendor in the area. Always fresh and reasonably priced.", date: "2 weeks ago", avatar: "G" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-green-600 to-green-900 text-white px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-10 -translate-x-10" />

        <div className="flex items-center gap-3 mb-6 relative z-10">
          <button onClick={onBack} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg flex-1">Vendor Profile</h1>
          <button className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center active:scale-90 transition-transform">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center relative z-10">
          <div className="w-24 h-24 bg-white/20 rounded-3xl mx-auto flex items-center justify-center text-4xl font-extrabold mb-3 border-2 border-white/30 shadow-xl">
            {vendor.name.charAt(0)}
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="font-extrabold text-xl">{vendor.name}</h2>
            {vendor.verified && <Shield className="w-5 h-5 text-green-300 fill-current" />}
          </div>
          <div className="flex items-center justify-center gap-1 text-green-200 text-sm mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>{vendor.location}</span>
          </div>

          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center mb-0.5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-extrabold">{vendor.rating}</span>
              </div>
              <span className="text-xs text-green-200">{vendor.reviewCount} reviews</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="font-extrabold text-green-300 mb-0.5">{vendor.distance}</div>
              <span className="text-xs text-green-200">away</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <Clock className="w-4 h-4 text-green-300 mx-auto mb-0.5" />
              <span className="text-xs text-green-200">Open Now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="mx-5 -mt-5 bg-white rounded-2xl shadow-lg p-4 grid grid-cols-3 gap-3 z-10 relative">
        <button className="flex flex-col items-center gap-1.5 py-3 active:scale-95 transition-transform">
          <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">
            <Phone className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-xs font-bold text-gray-700">Call</span>
        </button>
        <button
          onClick={() => onMessage?.(vendor.name, vendor.id)}
          className="flex flex-col items-center gap-1.5 py-3 active:scale-95 transition-transform"
        >
          <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs font-bold text-gray-700">Message</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 py-3 active:scale-95 transition-transform">
          <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center">
            <Navigation className="w-5 h-5 text-red-500" />
          </div>
          <span className="text-xs font-bold text-gray-700">Directions</span>
        </button>
      </div>

      {/* Categories */}
      <div className="px-5 pt-4">
        <div className="flex gap-2 flex-wrap">
          {vendor.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Available Products</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-semibold">{vendorProducts.length} items</span>
        </div>

        {vendorProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {vendorProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 active:scale-98 transition-transform"
              >
                <div className="relative aspect-square bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.inStock && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-md">
                      Fresh
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-1">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold text-sm">{product.price}<span className="text-xs text-gray-400 font-normal ml-0.5">{product.unit}</span></span>
                    <div className="flex items-center gap-0.5 text-xs">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-700">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-400 text-sm">No products available yet</p>
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="px-5 pt-5 pb-4">
        <h3 className="font-bold text-gray-900 mb-3">Customer Reviews</h3>

        <div className="space-y-3">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-gray-900">{review.name}</span>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-3 py-3 border-2 border-gray-200 text-gray-600 rounded-2xl font-bold text-sm active:scale-98 transition-transform">
          View All Reviews
        </button>
      </div>

      {onBottomNav && (
        <BottomNav activeTab={activeTab} onNavigate={onBottomNav} userType="consumer" />
      )}
    </div>
  );
}
