import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import statsBg from "@/assets/stats-bg.jpg";
import { apiGet } from "@/lib/api";



const Counter = ({ target, inView }: { target: number; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{count}</span>;
};

const StatsSection = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data: statsData, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const json = await apiGet("/stats");
      return json.data;
    }
  });

  const stats = statsData || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden min-h-[300px]">
      <div className="absolute inset-0">
        <img src={statsBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>
      <div className="relative z-10 container mx-auto px-6">
        {!isLoading && stats.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat._id || stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-heading text-5xl md:text-6xl text-white italic">
                  <Counter target={stat.value} inView={inView} />
                  {stat.suffix && <span className="ml-1 text-4xl md:text-5xl">{stat.suffix}</span>}
                </div>
                <p className="font-body text-sm text-primary-foreground/70 mt-2 italic">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[200px]">
             {isLoading && <Loader2 className="w-8 h-8 animate-spin text-white/50" />}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
