import { useState } from "react";
import { ArrowLeft, Search as SearchIcon, SlidersHorizontal, MapPin, Star } from "lucide-react";
import { mockProducts } from "../data/mockData";
import BottomNav from "../components/BottomNav";

interface SearchProps {
  onBack: () => void;
  activeTab?: string;
  onBottomNav?: (tab: string) => void;
}

export default function Search({ onBack, activeTab = "search", onBottomNav }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Fruits", "Vegetables", "Indigenous Foods", "Organic Foods", "Herbs & Spices"];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="font-bold text-gray-900 text-lg flex-1">Search</h1>
          <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center active:scale-90 transition-transform">
            <SlidersHorizontal className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for fresh produce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 mt-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                selectedCategory === category
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wide">
          {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} found
        </p>

        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex gap-3 bg-white border border-gray-100 rounded-2xl p-3.5 cursor-pointer active:scale-98 transition-transform shadow-sm"
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
                <p className="text-xs text-gray-500 mb-2">{product.category}</p>
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
                <div className="flex items-center gap-0.5 text-xs">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-800">{product.rating}</span>
                </div>
                <div
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    product.inStock
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-8 h-8 text-gray-300" />
            </div>
            <p className="font-semibold text-gray-700 mb-1">No results found</p>
            <p className="text-sm text-gray-400">Try different keywords or category</p>
          </div>
        )}
      </div>

      {onBottomNav && (
        <BottomNav activeTab={activeTab} onNavigate={onBottomNav} userType="consumer" />
      )}
    </div>
  );
}
