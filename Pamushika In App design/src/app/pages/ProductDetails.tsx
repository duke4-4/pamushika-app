import { ArrowLeft, Heart, MapPin, Star, Store, Plus, Minus, Leaf, HeartPulse } from "lucide-react";
import { Button } from "../components/ui/button";
import { mockProducts } from "../data/mockData";
import { useState } from "react";

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
}

export default function ProductDetails({ productId, onBack }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center justify-between border-b">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold">Product Details</h1>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-2 ${isFavorite ? "text-red-500" : "text-gray-400"}`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Image */}
        <div className="aspect-square bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="px-4 py-4 space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{product.price}</div>
                <div className="text-sm text-gray-500">{product.unit}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{product.distance}</span>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  product.inStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700 text-sm">{product.description}</p>
          </div>

          {/* Vendor */}
          <div
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer"
          >
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{product.vendorName}</h4>
              <p className="text-sm text-gray-600">View vendor profile</p>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
          </div>

          {/* Nutritional Information */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" /> Nutritional Information
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Vitamins</h4>
                <div className="flex flex-wrap gap-2">
                  {product.nutrition.vitamins.map((vitamin) => (
                    <span
                      key={vitamin}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                    >
                      {vitamin}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Minerals</h4>
                <div className="flex flex-wrap gap-2">
                  {product.nutrition.minerals.map((mineral) => (
                    <span
                      key={mineral}
                      className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium"
                    >
                      {mineral}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Protein</div>
                  <div className="font-semibold">{product.nutrition.protein}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Fiber</div>
                  <div className="font-semibold">{product.nutrition.fiber}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Benefits */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-red-500" /> Health Benefits
            </h3>
            <ul className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 hover:bg-gray-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-semibold w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <Button
            disabled={!product.inStock}
            className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300"
          >
            Contact Vendor
          </Button>
        </div>
      </div>
    </div>
  );
}
