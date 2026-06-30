import { useState } from "react";
import { ArrowLeft, Plus, Camera, Image as ImageIcon, Clock, Eye, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

interface VendorPostsProps {
  onBack: () => void;
}

export default function VendorPosts({ onBack }: VendorPostsProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Fresh Organic Tomatoes Available!",
      description: "Just harvested this morning. Sweet and juicy!",
      price: "$2.50/kg",
      image: "https://images.unsplash.com/photo-1546470427-227e44ef9c6b?w=400",
      time: "2 hours ago",
      views: 156,
      likes: 24,
    },
    {
      id: "2",
      title: "Premium Avocados - Limited Stock",
      description: "Perfectly ripe, ready to eat. First come, first served!",
      price: "$1.00 each",
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400",
      time: "5 hours ago",
      views: 203,
      likes: 38,
    },
  ]);

  const handleCreatePost = () => {
    if (!postData.title || !postData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      ...postData,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
      time: "Just now",
      views: 0,
      likes: 0,
    };

    setPosts([newPost, ...posts]);
    setShowCreateDialog(false);
    setPostData({ title: "", description: "", price: "" });
    toast.success("Post created successfully!");
  };

  const remainingPosts = 3 - posts.filter(p => p.time.includes("hours") || p.time === "Just now").length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-bold text-lg">Daily Posts</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Daily Limit Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Daily Posts</h3>
            <p className="text-sm text-green-100">
              {remainingPosts > 0 ? `${remainingPosts} posts remaining today` : "Daily limit reached"}
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold">{remainingPosts}</span>
          </div>
        </div>
      </div>

      {/* Create Post Button */}
      <div className="px-4 mb-4">
        <button
          onClick={() => setShowCreateDialog(true)}
          disabled={remainingPosts === 0}
          className="w-full h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center gap-3 active:scale-98 transition-transform disabled:opacity-50"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Plus className="w-6 h-6 text-green-600" />
          </div>
          <span className="font-semibold text-gray-900">Create New Post</span>
        </button>
      </div>

      {/* Posts List */}
      <div className="px-4 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 px-3 py-1.5 bg-green-600 text-white rounded-full text-sm font-bold shadow-lg">
                {post.price}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{post.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                </div>
                <button className="text-green-600 font-semibold">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-green-600 transition-colors">
              <Camera className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Add Photo</p>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                placeholder="e.g., Fresh Tomatoes Available"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                value={postData.description}
                onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-xl resize-none"
                placeholder="Describe your fresh produce..."
              />
            </div>

            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                value={postData.price}
                onChange={(e) => setPostData({ ...postData, price: e.target.value })}
                placeholder="e.g., $2.50/kg"
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
              className="flex-1 h-12 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePost}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 rounded-xl"
            >
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
