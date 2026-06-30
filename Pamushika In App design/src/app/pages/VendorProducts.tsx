import { useState } from "react";
import { ArrowLeft, Plus, Search, MoreVertical, Edit, Trash2, Package } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { mockProducts } from "../data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Label } from "../components/ui/label";

interface VendorProductsProps {
  onBack: () => void;
}

export default function VendorProducts({ onBack }: VendorProductsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Mock vendor's products
  const vendorProducts = mockProducts.filter((p) => p.vendorId === "v1");

  const filteredProducts = vendorProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 shadow-sm">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="p-2 -ml-2 active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-bold text-lg">My Products</h1>
          <div className="w-9" />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="h-10 gap-2 bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex gap-3 bg-white border border-gray-200 rounded-xl p-3"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium mb-1">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-green-600 font-semibold">
                    {product.price}
                    <span className="text-gray-500 font-normal ml-1">{product.unit}</span>
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full ${
                      product.inStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No products found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {searchQuery ? "Try a different search" : "Start adding products to your store"}
            </p>
          </div>
        )}
      </div>

      {/* Add Product Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input placeholder="e.g., Fresh Tomatoes" className="h-12" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input placeholder="e.g., Vegetables" className="h-12" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input placeholder="0.00" type="number" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Input placeholder="per kg" className="h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-lg resize-none"
                placeholder="Describe your product..."
              />
            </div>
            <div className="space-y-2">
              <Label>Upload Photo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-600 cursor-pointer transition-colors">
                <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload image</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowAddDialog(false)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
