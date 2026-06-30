import { useEffect, useState } from "react";
import { Apple, Leaf, ShoppingBasket } from "lucide-react";

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // icons animate in → hold → fade out
    const holdTimer = setTimeout(() => setPhase("hold"), 400);
    const outTimer = setTimeout(() => setPhase("out"), 2000);
    const doneTimer = setTimeout(onDone, 2500);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-700"
      style={{
        opacity: phase === "out" ? 0 : 1,
        transition: phase === "out" ? "opacity 0.5s ease-in-out" : "none",
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Animated icon trio */}
      <div className="flex items-end gap-3 mb-8 relative z-10">
        {[
          { Icon: Apple, bg: "bg-white/20", delay: "0ms", offset: phase === "hold" ? "0px" : "30px" },
          { Icon: Leaf, bg: "bg-yellow-400/80", delay: "120ms", offset: phase === "hold" ? "-10px" : "30px" },
          { Icon: ShoppingBasket, bg: "bg-red-500/80", delay: "240ms", offset: phase === "hold" ? "0px" : "30px" },
        ].map(({ Icon, bg, delay, offset }, i) => (
          <div
            key={i}
            className={`w-20 h-20 ${bg} rounded-2xl flex items-center justify-center shadow-xl border border-white/20`}
            style={{
              transform: `translateY(${offset})`,
              opacity: phase === "in" ? 0 : 1,
              transition: `transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${delay}, opacity 0.4s ease ${delay}`,
            }}
          >
            <Icon className="w-9 h-9 text-white" />
          </div>
        ))}
      </div>

      {/* App name */}
      <div
        className="relative z-10 text-center"
        style={{
          opacity: phase === "in" ? 0 : 1,
          transform: phase === "in" ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s",
        }}
      >
        <h1 className="text-white font-extrabold tracking-widest text-2xl mb-1">
          PAMUSHIKA IN
        </h1>
        <p className="text-green-200 text-sm tracking-wide">
          Fresh · Local · Healthy
        </p>
      </div>

      {/* Loading bar */}
      <div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full overflow-hidden"
        style={{
          opacity: phase === "in" ? 0 : 1,
          transition: "opacity 0.4s ease 0.5s",
        }}
      >
        <div
          className="h-full bg-white rounded-full"
          style={{
            width: phase === "hold" || phase === "out" ? "100%" : "0%",
            transition: "width 1.4s ease 0.6s",
          }}
        />
      </div>

      {/* Tagline */}
      <p
        className="absolute bottom-8 text-green-300 text-xs tracking-widest uppercase"
        style={{
          opacity: phase === "in" ? 0 : 1,
          transition: "opacity 0.4s ease 0.7s",
        }}
      >
        Empowering Local Communities
      </p>
    </div>
  );
}
