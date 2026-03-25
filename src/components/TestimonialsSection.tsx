import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import flowerImg from "@/assets/flower-bouquet.png";



const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const { data: testimonialsData, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const res = await fetch("/api/testimonials");
      const json = await res.json();
      return json.data;
    }
  });

  const testimonials = testimonialsData || [];

  const next = () => {
    if (testimonials.length === 0) return;
    setCurrent((p) => (p + 1) % testimonials.length);
  };
  const prev = () => {
    if (testimonials.length === 0) return;
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  if (isLoading) {
    return (
      <div className="py-24 flex items-center justify-center bg-muted/30">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show the section if no testimonials exist
  }

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Left flower decoration */}
      <div className="absolute left-0 lg:left-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block z-0">
        <motion.img
          src={flowerImg}
          alt=""
          className="w-72 lg:w-96 h-auto"
          initial={{ opacity: 0, x: -100, scaleX: -1 }}
          whileInView={{ opacity: 1, x: 0, scaleX: -1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>

      {/* Right flower decoration */}
      <div className="absolute right-0 lg:right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block z-0">
        <motion.img
          src={flowerImg}
          alt=""
          className="w-72 lg:w-96 h-auto"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Quote className="w-12 h-12 text-primary mx-auto mb-8" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-heading text-xl md:text-2xl italic text-foreground leading-relaxed mb-8">
                "{testimonials[current].text}"
              </p>
              <div className="w-12 h-px bg-primary mx-auto mb-6" />
              <p className="font-body font-semibold text-foreground">{testimonials[current].name}</p>
              <p className="font-body text-sm text-muted-foreground">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prev} className="w-12 h-12 border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
