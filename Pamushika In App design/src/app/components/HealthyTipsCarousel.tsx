import useEmblaCarousel from "embla-carousel-react";
import { Apple, Droplets, Leaf, Sun } from "lucide-react";

const healthyTips = [
  {
    id: "1",
    icon: Apple,
    title: "Eat a Rainbow",
    tip: "Consume fruits and vegetables of different colors daily for maximum nutrients",
    image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    overlay: "from-green-900/70 to-green-600/40",
  },
  {
    id: "2",
    icon: Droplets,
    title: "Stay Hydrated",
    tip: "Drink at least 8 glasses of water daily. Add lemon for extra vitamin C!",
    image: "https://images.unsplash.com/photo-1575596510825-f748919a2bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    overlay: "from-blue-900/70 to-blue-500/40",
  },
  {
    id: "3",
    icon: Leaf,
    title: "Go Organic",
    tip: "Choose organic produce when possible to reduce pesticide exposure",
    image: "https://images.unsplash.com/photo-1657288089316-c0350003ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    overlay: "from-yellow-900/70 to-yellow-600/40",
  },
  {
    id: "4",
    icon: Sun,
    title: "Seasonal is Best",
    tip: "Buy seasonal produce for better taste, nutrition, and value for money",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    overlay: "from-orange-900/70 to-orange-500/40",
  },
];

export default function HealthyTipsCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
      <div className="flex gap-3 py-1">
        {healthyTips.map((tip) => (
          <div key={tip.id} className="flex-[0_0_82%] min-w-0">
            <div className="relative h-36 rounded-2xl overflow-hidden shadow-lg">
              {/* Background image */}
              <img
                src={tip.image}
                alt={tip.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${tip.overlay}`} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-4">
                <div className="w-9 h-9 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <tip.icon className="w-4.5 h-4.5 w-[18px] h-[18px] text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5 drop-shadow">{tip.title}</h4>
                  <p className="text-white/90 text-xs leading-relaxed line-clamp-2 drop-shadow">{tip.tip}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
