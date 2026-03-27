import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-banquet.jpg";
import { apiGet } from "@/lib/api";
import { getMinioUrl } from "@/lib/minioUrl";

interface Banner {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  useVideoBackground: boolean;
}

const HeroSection = () => {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await apiGet("/banner/current");
        if (data.data) {
          setBanner(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  // Determine which background to use
  const shouldUseVideo = banner?.mediaType === 'video' && banner?.useVideoBackground;
  const backgroundUrl = banner ? getMinioUrl(banner.mediaUrl) : heroBg;

  return (
    <section className="relative min-h-[calc(100vh-100px)] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {shouldUseVideo && banner?.mediaUrl ? (
          <video 
            src={backgroundUrl} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={backgroundUrl} 
            alt="Luxury banquet hall" 
            className="w-full h-full object-cover" 
          />
        )}
        {/* Only top shadow — to keep navbar readable. No sides, no bottom. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 20%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 60%)",
          }}
        />
      </div>

      {/* Content — text sits in the clear zone, with its own shadow for legibility */}
      <div className="relative z-10 container mx-auto px-6 text-center -mt-12 md:-mt-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="uppercase tracking-[0.25em] text-sm font-ui font-semibold text-[#F59620] mb-6"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
        >
          Premium Event Management &amp; Banquet Services
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 italic leading-tight"
          style={{ textShadow: "0 4px 32px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.6)" }}
        >
          Crafting Unforgettable
          <br />
          <span style={{ color: "#F59620" }}>Celebrations</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-body text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
        >
          Let us plan your next event together — from intimate gatherings to grand celebrations,
          we bring your vision to life with Star Food &amp; Banquet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/contact" className="btn-primary rounded-full text-base px-10 py-4">
            Book Your Event
          </Link>
          <Link to="/gallery" className="btn-outline-white rounded-full text-base px-10 py-4">
            View Gallery
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/80 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
