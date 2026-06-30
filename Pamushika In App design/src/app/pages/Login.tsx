import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

interface LoginProps {
  setAuth: (auth: boolean) => void;
  setUserType: (type: "consumer" | "vendor") => void;
  onBack: () => void;
}

type LoadingState = "idle" | "loading" | "success";

export default function Login({ setAuth, setUserType, onBack }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");

  const isLoading = loadingState === "loading";
  const isSuccess = loadingState === "success";

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isLoading || isSuccess) return;

    setLoadingState("loading");

    // Simulate network request then show success tick before navigating
    setTimeout(() => {
      setLoadingState("success");
      setTimeout(() => {
        setAuth(true);
        setUserType("consumer");
      }, 700);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 pt-12 pb-5 bg-white flex items-center">
        <button
          onClick={onBack}
          disabled={isLoading || isSuccess}
          className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center active:scale-90 transition-transform disabled:opacity-40"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg text-gray-900">Sign In</h1>
        <div className="w-9" />
      </div>

      {/* Branding strip */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 mx-5 rounded-2xl px-5 py-6 mb-8 text-center shadow-lg">
        <p className="text-green-200 text-xs font-semibold tracking-widest uppercase mb-1">Welcome back</p>
        <h2 className="text-white font-extrabold text-xl">PAMUSHIKA IN</h2>
        <p className="text-green-300 text-xs mt-1">Your fresh produce marketplace</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || isSuccess}
                className="h-14 rounded-2xl border-gray-200 bg-gray-50 text-base pr-4 disabled:opacity-60 focus:border-green-500 focus:ring-green-500"
              />
              {/* Shimmer overlay when loading */}
              {isLoading && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div
                    className="h-full w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.2s infinite",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading || isSuccess}
                className="h-14 rounded-2xl border-gray-200 bg-gray-50 text-base pr-12 disabled:opacity-60 focus:border-green-500 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                disabled={isLoading || isSuccess}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 disabled:opacity-40"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {isLoading && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div
                    className="h-full w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.2s infinite 0.2s",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              disabled={isLoading || isSuccess}
              className="text-sm text-green-600 font-semibold disabled:opacity-40"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit button — transitions through idle → loading → success */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full h-14 rounded-2xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 mt-2 ${
              isSuccess
                ? "bg-green-500 text-white scale-98"
                : "bg-green-600 text-white hover:bg-green-700 disabled:opacity-80"
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 animate-[scale-in_0.3s_ease]" />
                Welcome back!
              </>
            ) : isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Loading status message */}
        {isLoading && (
          <p className="text-center text-xs text-gray-400 mt-4 animate-pulse">
            Verifying your credentials...
          </p>
        )}
        {isSuccess && (
          <p className="text-center text-xs text-green-600 mt-4 font-medium">
            Login successful — taking you in...
          </p>
        )}
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
