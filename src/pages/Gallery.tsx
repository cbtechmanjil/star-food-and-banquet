import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-banquet.jpg";
import aboutImg from "@/assets/about-venue.jpg";
import corpImg from "@/assets/service-corporate.jpg";
import partyImg from "@/assets/service-party.jpg";
import weddingImg from "@/assets/service-wedding.jpg";
import eventImg from "@/assets/service-event.jpg";
import statsBg from "@/assets/stats-bg.jpg";

const categories = ["All", "Weddings", "Corporate", "Parties", "Venues"];

const images = [
  { src: heroBg, category: "Venues", title: "Grand Ballroom" },
  { src: aboutImg, category: "Weddings", title: "Romantic Setup" },
  { src: corpImg, category: "Corporate", title: "Corporate Gala" },
  { src: partyImg, category: "Parties", title: "Cocktail Evening" },
  { src: weddingImg, category: "Weddings", title: "Dream Wedding" },
  { src: eventImg, category: "Parties", title: "Birthday Celebration" },
  { src: statsBg, category: "Parties", title: "Dance Night" },
  { src: heroBg, category: "Venues", title: "Crystal Hall" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative pt-40 pb-24 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-3">Our Portfolio</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-5xl md:text-6xl italic">Gallery</motion.h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`font-ui text-sm uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all ${filter === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"}`}>
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div key={`${img.title}-${i}`} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} className="relative group overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]">
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-center justify-center">
                    <p className="font-heading text-2xl text-primary-foreground italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">{img.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Gallery;
