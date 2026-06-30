import { useState } from "react";
import { ArrowLeft, Heart, MapPin, Star, ShoppingBag } from "lucide-react";
import { mockProducts } from "../data/mockData";
import BottomNav from "../components/BottomNav";

interface FavoritesProps {
  onBack: () => void;
  activeTab?: string;
  onBottomNav?: (tab: string) => void;
}

export default function Favorites({ onBack, activeTab = "favorites", onBottomNav }: FavoritesProps) {
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(mockProducts.slice(0, 4).map((p) => p.id))
  );

  const favoriteProducts = mockProducts.filter((p) => favorites.has(p.id));

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="font-bold text-gray-900 text-lg flex-1">Saved Items</h1>
          <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {favoriteProducts.length > 0 ? (
          <>
            <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wide">
              {favoriteProducts.length} saved item{favoriteProducts.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-3">
              {favoriteProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm active:scale-98 transition-transform"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{product.vendorName}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-green-600 font-bold">
                        {product.price}
                        <span className="text-gray-400 font-normal ml-1">{product.unit}</span>
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{product.distance}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </button>
                    <div className="flex items-center gap-0.5 text-xs">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-800">{product.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-10 h-10 text-red-300" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">No saved items yet</h3>
            <p className="text-gray-500 text-sm mb-6 text-center px-6">
              Tap the heart icon on any product to save it here
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold shadow-md active:scale-95 transition-transform"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>

      {onBottomNav && (
        <BottomNav activeTab={activeTab} onNavigate={onBottomNav} userType="consumer" />
      )}
    </div>
  );
}
