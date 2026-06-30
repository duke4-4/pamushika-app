import { useState } from "react";
import {
  Package, DollarSign, Star, TrendingUp, Users,
  Settings, Eye, MapPin, Bell, ChevronRight, ArrowUpRight,
  Clock, CheckCircle2, AlertCircle, Zap,
} from "lucide-react";
import VendorProducts from "./VendorProducts";
import VendorPosts from "./VendorPosts";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import BottomNav from "../components/BottomNav";

interface VendorDashboardProps {
  onNavigate: (page: string) => void;
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1585540083814-ea6ee8af9e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900";

export default function VendorDashboard({ onNavigate }: VendorDashboardProps) {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("vendor-dashboard");

  if (selectedPage === "vendor-products") return <VendorProducts onBack={() => setSelectedPage(null)} />;
  if (selectedPage === "vendor-posts") return <VendorPosts onBack={() => setSelectedPage(null)} />;
  if (selectedPage === "profile") return <Profile onBack={() => setSelectedPage(null)} onEditProfile={() => setSelectedPage("edit-profile")} />;
  if (selectedPage === "edit-profile") return <EditProfile onBack={() => setSelectedPage("profile")} userType="vendor" />;

  const stats = [
    { label: "Products", value: "24", change: "+3", Icon: Package, accent: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
    { label: "Revenue", value: "$1,240", change: "+12%", Icon: DollarSign, accent: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-100" },
    { label: "Rating", value: "4.8", change: "+0.2", Icon: Star, accent: "text-red-500", bg: "bg-red-50", border: "border-red-100" },
    { label: "Views", value: "156", change: "+24", Icon: Eye, accent: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  ];

  const recentOrders = [
    { id: "1", customer: "Sarah M.", product: "Fresh Ginger", amount: "$2.50", status: "pending", time: "5 min ago" },
    { id: "2", customer: "John D.", product: "Sweet Potatoes", amount: "$4.50", status: "completed", time: "1 hr ago" },
    { id: "3", customer: "Grace K.", product: "Pumpkin Leaves", amount: "$3.00", status: "completed", time: "3 hr ago" },
    { id: "4", customer: "Tendai M.", product: "Tomatoes 2kg", amount: "$6.00", status: "pending", time: "4 hr ago" },
  ];

  const quickActions = [
    { label: "Products", sub: "24 items", Icon: Package, color: "from-green-500 to-green-700", page: "vendor-products" },
    { label: "Posts", sub: "Daily updates", Icon: Zap, color: "from-yellow-400 to-yellow-600", page: "vendor-posts" },
    { label: "Customers", sub: "View insights", Icon: Users, color: "from-blue-500 to-blue-700", page: null },
    { label: "Location", sub: "Harare CBD", Icon: MapPin, color: "from-red-500 to-red-700", page: null },
  ];

  const weekData = [65, 80, 55, 90, 70, 85, 95];
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const maxVal = Math.max(...weekData);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">

      {/* Hero with image background */}
      <div className="relative overflow-hidden" style={{ minHeight: 240 }}>
        <img
          src={HERO_IMAGE}
          alt="Vendor at market"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-green-800/70 to-green-600/50" />

        <div className="relative z-10 px-5 pt-12 pb-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-green-300 text-xs font-semibold tracking-widest uppercase mb-0.5">Vendor Dashboard</p>
              <h1 className="text-white font-extrabold text-xl leading-tight">Green Market Fresh</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-300 text-xs font-medium">Open · Harare CBD</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 active:scale-90 transition-transform">
                <Bell className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setSelectedPage("edit-profile")}
                className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 active:scale-90 transition-transform"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Earnings pill */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20 flex items-center justify-between">
            <div>
              <p className="text-green-200 text-xs mb-0.5">This Month's Earnings</p>
              <p className="text-white font-extrabold text-2xl">$1,240.00</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-0.5">
                <ArrowUpRight className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-bold text-sm">+12%</span>
              </div>
              <p className="text-green-300 text-xs">vs last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid — floated up to overlap hero bottom */}
      <div className="px-5 -mt-3">
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl p-3 shadow-md border ${stat.border} flex flex-col items-center text-center`}
            >
              <div className={`w-8 h-8 ${stat.bg} rounded-xl flex items-center justify-center mb-1.5`}>
                <stat.Icon className={`w-4 h-4 ${stat.accent}`} />
              </div>
              <p className={`font-extrabold text-sm ${stat.accent}`}>{stat.value}</p>
              <p className="text-gray-500 text-xs leading-tight">{stat.label}</p>
              <span className="text-green-600 text-xs font-semibold mt-0.5">{stat.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mt-5">
        <h2 className="font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => action.page && setSelectedPage(action.page)}
              className="flex flex-col items-center active:scale-95 transition-transform"
            >
              <div className={`w-full aspect-square bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center shadow-md mb-1.5`}>
                <action.Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-bold text-gray-800 text-center leading-tight">{action.label}</p>
              <p className="text-xs text-gray-400 text-center leading-tight">{action.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly bar chart */}
      <div className="mx-5 mt-5 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-900">Weekly Sales</h3>
            <p className="text-xs text-gray-400">This week's performance</p>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-green-50 rounded-full">
            <TrendingUp className="w-3.5 h-3.5 text-green-600" />
            <span className="text-green-600 text-xs font-bold">+12%</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-1.5 mb-2" style={{ height: 80 }}>
          {weekData.map((val, i) => {
            const isToday = i === 6;
            const heightPct = (val / maxVal) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1" style={{ height: "100%" }}>
                <div className="flex-1 w-full flex items-end">
                  <div
                    className={`w-full rounded-t-xl ${isToday ? "bg-gradient-to-t from-green-600 to-green-400" : "bg-green-100"}`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className={`text-xs font-semibold ${isToday ? "text-green-600" : "text-gray-400"}`}>
                  {weekDays[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mx-5 mt-5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-50">
          <h3 className="font-bold text-gray-900">Recent Orders</h3>
          <button className="flex items-center gap-1 text-green-600 text-xs font-bold">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center gap-3 px-4 py-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${order.status === "pending" ? "bg-yellow-50" : "bg-green-50"}`}>
                {order.status === "pending"
                  ? <Clock className="w-4 h-4 text-yellow-500" />
                  : <CheckCircle2 className="w-4 h-4 text-green-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm line-clamp-1">{order.customer}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{order.product}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-sm text-green-600">{order.amount}</p>
                <p className="text-xs text-gray-400">{order.time}</p>
              </div>
              <div className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-bold ${order.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                {order.status === "pending" ? "Pending" : "Done"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low stock alert */}
      <div className="mx-5 mt-4 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 flex items-center gap-3">
        <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-500" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-red-700 text-sm">Low Stock Alert</p>
          <p className="text-red-500 text-xs mt-0.5">3 products running low — update now</p>
        </div>
        <button
          onClick={() => setSelectedPage("vendor-products")}
          className="flex-shrink-0 px-3 py-1.5 bg-red-500 text-white rounded-xl text-xs font-bold active:scale-95 transition-transform"
        >
          Fix
        </button>
      </div>

      {/* Upgrade banner */}
      <div className="mx-5 mt-4 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl px-4 py-4 flex items-center gap-3 shadow-md">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-sm">Upgrade to Pro</p>
          <p className="text-green-200 text-xs">Featured listings & priority support</p>
        </div>
        <button className="flex-shrink-0 px-3 py-2 bg-yellow-400 text-gray-900 rounded-xl text-xs font-extrabold active:scale-95 transition-transform">
          Upgrade
        </button>
      </div>

      <BottomNav
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          if (tab === "vendor-dashboard") setSelectedPage(null);
          else if (tab === "vendor-products") setSelectedPage("vendor-products");
          else if (tab === "vendor-posts") setSelectedPage("vendor-posts");
          else if (tab === "profile") setSelectedPage("profile");
        }}
        userType="vendor"
      />
    </div>
  );
}
