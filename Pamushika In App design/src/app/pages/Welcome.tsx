import { useState } from "react";
import { Button } from "../components/ui/button";
import { Apple, Leaf, ShoppingBasket } from "lucide-react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import VendorRegister from "./VendorRegister";
import VendorOnboarding from "./VendorOnboarding";
import VendorDashboard from "./VendorDashboard";
import Walkthrough from "../components/Walkthrough";

export default function Welcome() {
  const [currentPage, setCurrentPage] = useState<string>("welcome");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resolvedUserType, setResolvedUserType] = useState<"consumer" | "vendor" | null>(null);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [isNewSignup, setIsNewSignup] = useState(false);

  // Called after successful auth — isNew=true only for registrations, not logins
  const handleAuth = (auth: boolean, type: "consumer" | "vendor", isNew = false) => {
    setIsAuthenticated(auth);
    setResolvedUserType(type);
    if (isNew) {
      setShowWalkthrough(true);
      setIsNewSignup(true);
    } else {
      setCurrentPage(type === "vendor" ? "vendor-dashboard" : "home");
    }
  };

  const handleWalkthroughComplete = () => {
    setShowWalkthrough(false);
    setCurrentPage(resolvedUserType === "vendor" ? "vendor-dashboard" : "home");
  };

  // Show walkthrough after new signup
  if (showWalkthrough && resolvedUserType) {
    return (
      <Walkthrough
        userType={resolvedUserType}
        onComplete={handleWalkthroughComplete}
      />
    );
  }

  if (currentPage === "home" && isAuthenticated) {
    return <Home onNavigate={setCurrentPage} />;
  }

  if (currentPage === "vendor-dashboard" && isAuthenticated) {
    return <VendorDashboard onNavigate={setCurrentPage} />;
  }

  if (currentPage === "login") {
    return (
      <Login
        setAuth={(auth) => handleAuth(auth, "consumer", false)}
        setUserType={() => {}}
        onBack={() => setCurrentPage("welcome")}
      />
    );
  }

  if (currentPage === "register") {
    return (
      <Register
        setAuth={(auth) => handleAuth(auth, "consumer", true)}
        setUserType={() => {}}
        onBack={() => setCurrentPage("welcome")}
      />
    );
  }

  if (currentPage === "vendor-register") {
    return (
      <VendorRegister
        onGetStarted={() => setCurrentPage("vendor-onboarding")}
        onBack={() => setCurrentPage("welcome")}
      />
    );
  }

  if (currentPage === "vendor-onboarding") {
    return (
      <VendorOnboarding
        setAuth={(auth) => handleAuth(auth, "vendor", true)}
        setUserType={() => {}}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="text-center space-y-6 w-full">
          {/* Logo/Icons */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Apple className="w-10 h-10 text-white" />
            </div>
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <ShoppingBasket className="w-10 h-10 text-white" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              PAMUSHIKA IN
            </h1>
            <p className="text-base text-gray-600 px-4">
              Connecting you with local vendors for fresh fruits, vegetables, and indigenous African foods
            </p>
          </div>

          <div className="space-y-3 pt-6 w-full px-4">
            <Button
              onClick={() => setCurrentPage("login")}
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-base font-medium rounded-xl shadow-md"
            >
              Sign In
            </Button>

            <Button
              onClick={() => setCurrentPage("register")}
              variant="outline"
              className="w-full h-14 border-2 border-green-600 text-green-600 hover:bg-green-50 text-base font-medium rounded-xl"
            >
              Create Account
            </Button>

            <button
              onClick={() => setCurrentPage("vendor-register")}
              className="w-full text-sm text-gray-600 hover:text-green-600 underline mt-3 py-2"
            >
              I'm a vendor - Join now
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 pb-8 space-y-3">
        <div className="flex items-center gap-3 text-sm bg-white/60 rounded-lg p-3">
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
          <span className="text-gray-700">Find fresh organic produce nearby</span>
        </div>
        <div className="flex items-center gap-3 text-sm bg-white/60 rounded-lg p-3">
          <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
          <span className="text-gray-700">Learn about nutritional benefits</span>
        </div>
        <div className="flex items-center gap-3 text-sm bg-white/60 rounded-lg p-3">
          <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
          <span className="text-gray-700">Support local vendors</span>
        </div>
      </div>
    </div>
  );
}
