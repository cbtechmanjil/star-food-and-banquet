import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import heroBg from "@/assets/hero-banquet.jpg";
import { apiGet } from "@/lib/api";
import { getMinioUrl } from "@/lib/minioUrl";
import OptimizedImage from "./OptimizedImage";

interface Banner {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  useVideoBackground: boolean;
  slogan?: string;
  title?: string;
  subtitle?: string;
  order: number;
}
const HeroSection = () => {
  const [slides, setSlides] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [heroMode, setHeroMode] = useState<'image' | 'video'>('image');

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await apiGet("/banner/current");
        if (data && data.data && Array.isArray(data.data)) {
          setSlides(data.data);
        }
        if (data && data.settings) {
          setHeroMode(data.settings.heroMode);
        }
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Filter slides based on hero mode
  const activeSlides = useMemo(() => {
    if (!slides || !Array.isArray(slides)) return [];

    if (heroMode === 'video') {
      const videoSlide = slides.find(s => s && s.order === 0);
      return videoSlide ? [videoSlide] : [];
    }
    return slides.filter(s => s && s.order >= 1 && s.order <= 3);
  }, [slides, heroMode]);

  // Auto-play carousel
  useEffect(() => {
    if (!activeSlides || activeSlides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [activeSlides.length]);

  // Reset index if mode changes or slides change
  useEffect(() => {
    setCurrentIndex(0);
  }, [heroMode, activeSlides.length]);

  if (loading) return (
    <div className="h-screen bg-charcoal flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // If no slides for the mode, show fallback
  const displaySlides = activeSlides.length > 0 ? activeSlides : [{
    mediaUrl: heroBg,
    mediaType: 'image',
    useVideoBackground: false,
    slogan: "Premium Event Management & Banquet Services",
    title: "Crafting Unforgettable - Celebrations",
    subtitle: "Let us plan your next event together — from intimate gatherings to grand celebrations.",
    order: 1
  } as Banner];

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-charcoal">
      <AnimatePresence mode="wait">
        {displaySlides.map((slide, index) => (
          index === currentIndex && (
            <motion.div 
              key={(slide?.mediaUrl || 'fallback') + index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Background */}
              <div className="absolute inset-0">
                {slide.mediaType === 'video' && slide.useVideoBackground ? (
                  <video 
                    src={getMinioUrl(slide.mediaUrl)} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover scale-105"
                  />
                ) : (
                  <OptimizedImage 
                    src={slide.mediaUrl} 
                    alt={slide.title} 
                    width={1920}
                    quality={85}
                    containerClassName="absolute inset-0"
                    className="w-full h-full object-cover"
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="container mx-auto px-6 text-center -mt-12 md:-mt-16">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="uppercase tracking-[0.25em] text-xs md:text-sm font-ui font-bold text-gold mb-6"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                  >
                    {slide?.slogan || "Excellence in Every Event"}
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-8 italic leading-tight"
                    style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
                  >
                    {slide?.title?.split('-')?.[0]?.trim() || "Star Food & Banquet"}
                    {slide?.title?.split('-')?.[1] && (
                      <>
                        <br />
                        <span className="text-gold">{slide?.title?.split('-')?.[1]?.trim()}</span>
                      </>
                    )}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="font-body text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                  >
                    {slide?.subtitle || "Premium Event Management & Banquet Services in Kathmandu"}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center"
                  >
                    <Link to="/contact" className="btn-primary rounded-full text-base px-12 py-4 shadow-xl shadow-gold/10">
                      Book Your Event
                    </Link>
                    <Link to="/gallery" className="btn-outline-white rounded-full text-base px-12 py-4 backdrop-blur-sm">
                      View Gallery
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Slide Indicators */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {displaySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-12 h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-gold w-16' : 'bg-white/30'}`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 right-8 z-20 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div 
             animate={{ opacity: [0.3, 1, 0.3] }}
             transition={{ repeat: Infinity, duration: 1.5 }}
             className="w-1.5 h-1.5 bg-white rounded-full" 
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
