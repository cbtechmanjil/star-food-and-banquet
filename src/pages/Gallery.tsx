import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import heroBg from "@/assets/hero-banquet.jpg";
import aboutImg from "@/assets/about-venue.jpg";
import corpImg from "@/assets/service-corporate.jpg";
import partyImg from "@/assets/service-party.jpg";
import weddingImg from "@/assets/service-wedding.jpg";
import eventImg from "@/assets/service-event.jpg";
import statsBg from "@/assets/stats-bg.jpg";
import CTASection from "@/components/CTASection";

const categories = ["All", "Weddings", "Corporate", "Parties", "Venues"];

const allImages = [
  { src: heroBg, category: "Venues", title: "Grand Ballroom" },
  { src: aboutImg, category: "Weddings", title: "Romantic Setup" },
  { src: corpImg, category: "Corporate", title: "Corporate Gala" },
  { src: partyImg, category: "Parties", title: "Cocktail Evening" },
  { src: weddingImg, category: "Weddings", title: "Dream Wedding" },
  { src: eventImg, category: "Parties", title: "Birthday Celebration" },
  { src: statsBg, category: "Parties", title: "Dance Night" },
  { src: heroBg, category: "Venues", title: "Crystal Hall" },
  { src: aboutImg, category: "Weddings", title: "Floral Arch" },
  { src: corpImg, category: "Corporate", title: "Annual Dinner" },
  { src: partyImg, category: "Parties", title: "Garden Party" },
  { src: weddingImg, category: "Weddings", title: "Golden Hour Ceremony" },
  { src: eventImg, category: "Parties", title: "Gala Night" },
  { src: statsBg, category: "Venues", title: "The Terrace" },
  { src: heroBg, category: "Corporate", title: "Product Launch" },
  { src: aboutImg, category: "Weddings", title: "Candlelit Dinner" },
  { src: corpImg, category: "Corporate", title: "Board Meeting" },
  { src: partyImg, category: "Parties", title: "New Year Bash" },
];

// 3 columns, 5 rows = 15 images shown initially per filter
const COLS = 3;
const INITIAL_ROWS = 5;
const INITIAL_COUNT = COLS * INITIAL_ROWS; // 15

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === "All" ? allImages : allImages.filter((img) => img.category === filter);
  const visibleImages = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset visible count when filter changes
  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setVisibleCount(INITIAL_COUNT);
  };

  // Lightbox navigation
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % visibleImages.length);
  }, [lightboxIndex, visibleImages.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + visibleImages.length) % visibleImages.length);
  }, [lightboxIndex, visibleImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section
        className="relative pt-24 pb-24 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5">
        <div className="container mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-3">
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl italic"
          >
            Gallery
          </motion.h1>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`font-ui text-sm uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 ${filter === cat
                  ? "text-white shadow-lg"
                  : "hover:scale-105"
                  }`}
                style={
                  filter === cat
                    ? { backgroundColor: "hsl(33 91% 54%)", boxShadow: "0 4px 20px hsl(33 91% 54% / 0.4)" }
                    : { backgroundColor: "hsl(231 56% 36% / 0.1)", color: "hsl(231 56% 36%)", border: "1px solid hsl(231 56% 36% / 0.3)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleImages.map((img, i) => (
                <motion.div
                  key={`${img.title}-${filter}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="relative group overflow-hidden cursor-pointer aspect-[4/3] shadow-md"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-all duration-500 flex flex-col items-center justify-center"
                    style={{ background: "rgba(0,0,0,0)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(40,56,143,0.55)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0)"; }}
                  >
                    <ZoomIn
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 mb-2"
                    />
                    <p className="font-heading text-xl text-white italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {img.title}
                    </p>
                    {/* Category badge */}
                    <span
                      className="absolute top-3 right-3 text-xs font-ui font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ backgroundColor: "hsl(33 91% 54%)", color: "#fff" }}
                    >
                      {img.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => setVisibleCount((prev) => prev + INITIAL_COUNT)}
                className="btn-secondary rounded-full px-12 py-4 text-base font-semibold inline-flex items-center gap-3 hover:scale-105 transition-transform"
              >
                Load More
                <span className="text-sm opacity-80">
                  ({filtered.length - visibleCount} remaining)
                </span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
              style={{ backgroundColor: "hsl(33 91% 54%)" }}
              onClick={closeLightbox}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 font-ui text-white/70 text-sm">
              {lightboxIndex + 1} / {visibleImages.length}
            </div>

            {/* Prev Arrow */}
            <button
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
              style={{ backgroundColor: "hsl(231 56% 36%)" }}
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "90vw", maxHeight: "85vh" }}
            >
              <img
                src={visibleImages[lightboxIndex].src}
                alt={visibleImages[lightboxIndex].title}
                className="object-contain shadow-2xl"
                style={{ maxWidth: "85vw", maxHeight: "78vh" }}
              />
              <div className="mt-4 text-center">
                <p className="font-heading text-2xl text-white italic">
                  {visibleImages[lightboxIndex].title}
                </p>
                <span
                  className="inline-block mt-2 text-xs font-ui font-semibold px-4 py-1.5 rounded-full"
                  style={{ backgroundColor: "hsl(33 91% 54%)", color: "#fff" }}
                >
                  {visibleImages[lightboxIndex].category}
                </span>
              </div>
            </motion.div>

            {/* Next Arrow */}
            <button
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
              style={{ backgroundColor: "hsl(231 56% 36%)" }}
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {visibleImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all"
                  style={{
                    outline: i === lightboxIndex ? "2px solid hsl(33 91% 54%)" : "2px solid transparent",
                    opacity: i === lightboxIndex ? 1 : 0.5,
                  }}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Gallery;
