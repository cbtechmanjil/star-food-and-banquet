import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Coffee,
  Leaf,
  Clock,
  MapPin,
  Phone,
  ChevronDown,
  Star,
  Flame,
  IceCreamCone,
  CakeSlice,
  Sandwich,
} from "lucide-react";

import cafeHero from "@/assets/cafe-hero.png";
import cafeSmoothie from "@/assets/cafe-smoothie.png";
import cafeLatte from "@/assets/cafe-latte.png";
import cafeInterior1 from "@/assets/cafe-interior-1.png";
import cafeInterior2 from "@/assets/cafe-interior-2.png";
import cafeInterior3 from "@/assets/cafe-interior-3.png";

/* ───────────────────────── data ───────────────────────── */

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  veg?: boolean;
  vegan?: boolean;
  bestseller?: boolean;
  image?: string;
};

type MenuCategory = {
  title: string;
  icon: React.ElementType;
  items: MenuItem[];
};

const menuCategories: MenuCategory[] = [
  {
    title: "Hot Beverages",
    icon: Coffee,
    items: [
      { name: "Classic Espresso", desc: "Double-shot, rich & bold", price: "Rs. 180", veg: true },
      { name: "Cappuccino", desc: "Creamy foam with cocoa dust", price: "Rs. 220", veg: true, bestseller: true },
      { name: "Café Latte", desc: "Smooth steamed milk & espresso", price: "Rs. 240", veg: true },
      { name: "Mocha Delight", desc: "Chocolate, espresso & whipped cream", price: "Rs. 280", veg: true },
      { name: "Masala Chai", desc: "Traditional spiced milk tea", price: "Rs. 120", veg: true, vegan: true },
      { name: "Green Tea", desc: "Organic Japanese sencha", price: "Rs. 150", veg: true, vegan: true },
      { name: "Hot Chocolate", desc: "Belgian cocoa with marshmallows", price: "Rs. 260", veg: true },
    ],
  },
  {
    title: "Cold Beverages",
    icon: IceCreamCone,
    items: [
      { name: "Iced Americano", desc: "Bold espresso over ice", price: "Rs. 200", veg: true, vegan: true },
      { name: "Cold Brew", desc: "16-hr slow steeped, smooth finish", price: "Rs. 250", veg: true, bestseller: true },
      { name: "Mango Smoothie", desc: "Fresh Alphonso mango blend", price: "Rs. 280", veg: true, vegan: true },
      { name: "Berry Blast", desc: "Mixed berries, yogurt & honey", price: "Rs. 300", veg: true },
      { name: "Iced Matcha Latte", desc: "Ceremonial grade matcha on ice", price: "Rs. 290", veg: true },
      { name: "Mint Mojito", desc: "Refreshing mint & lime cooler", price: "Rs. 220", veg: true, vegan: true },
    ],
  },
  {
    title: "Snacks & Bites",
    icon: Sandwich,
    items: [
      { name: "Grilled Panini", desc: "Pesto, mozzarella & sun-dried tomato", price: "Rs. 320", veg: true, bestseller: true },
      { name: "Club Sandwich", desc: "Triple-decker with fries", price: "Rs. 350", veg: false },
      { name: "Veg Spring Rolls", desc: "Crispy rolls with sweet chilli", price: "Rs. 220", veg: true, vegan: true },
      { name: "Loaded Nachos", desc: "Cheese, jalapeños & salsa", price: "Rs. 280", veg: true },
      { name: "Bruschetta", desc: "Toasted ciabatta, fresh tomato-basil", price: "Rs. 240", veg: true, vegan: true },
      { name: "Chicken Wrap", desc: "Grilled chicken, lettuce & mayo", price: "Rs. 340", veg: false },
    ],
  },
  {
    title: "Desserts & Pastries",
    icon: CakeSlice,
    items: [
      { name: "New York Cheesecake", desc: "Classic baked with berry compote", price: "Rs. 320", veg: true, bestseller: true },
      { name: "Chocolate Brownie", desc: "Warm, gooey with vanilla ice cream", price: "Rs. 280", veg: true },
      { name: "Tiramisu", desc: "Espresso-soaked mascarpone layers", price: "Rs. 340", veg: true },
      { name: "French Croissant", desc: "Buttery, flaky, fresh-baked", price: "Rs. 180", veg: true },
      { name: "Blueberry Muffin", desc: "Soft, fruity & glazed", price: "Rs. 160", veg: true },
      { name: "Vegan Banana Bread", desc: "Moist, nutty & wholesome", price: "Rs. 200", veg: true, vegan: true },
    ],
  },
];

const signatureItems: (MenuItem & { image: string })[] = [
  {
    name: "Signature Cold Brew",
    desc: "16-hour steeped, silky smooth finish with hints of caramel",
    price: "Rs. 250",
    veg: true,
    image: cafeLatte,
  },
  {
    name: "Açaí Smoothie Bowl",
    desc: "Vibrant açaí base topped with granola, berries & honey",
    price: "Rs. 380",
    veg: true,
    vegan: true,
    image: cafeSmoothie,
  },
  {
    name: "Artisan Cappuccino",
    desc: "Hand-crafted latte art with premium single-origin beans",
    price: "Rs. 220",
    veg: true,
    image: cafeLatte,
  },
  {
    name: "NY Cheesecake",
    desc: "Classic baked cheesecake with seasonal berry compote",
    price: "Rs. 320",
    veg: true,
    image: cafeSmoothie,
  },
  {
    name: "Mango Smoothie",
    desc: "Fresh Alphonso mango blended to creamy perfection",
    price: "Rs. 280",
    veg: true,
    vegan: true,
    image: cafeSmoothie,
  },
  {
    name: "Grilled Panini",
    desc: "Pesto, mozzarella & sun-dried tomato on ciabatta",
    price: "Rs. 320",
    veg: true,
    image: cafeLatte,
  },
];

const galleryImages = [
  cafeInterior1,
  cafeInterior2,
  cafeInterior3,
  cafeHero,
  cafeLatte,
  cafeSmoothie,
];

/* ─────────────── Signature Carousel (CSS-driven, infinite, no flicker) ─────────────── */

const SignatureCarousel = () => {
  // Double the items array for seamless infinite loop
  const doubledItems = [...signatureItems, ...signatureItems];

  return (
    <div className="relative overflow-hidden">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

      <div className="cafe-signature-track">
        {doubledItems.map((item, i) => (
          <div
            key={`sig-${i}`}
            className="flex-shrink-0 w-[300px] md:w-[340px] mx-3"
          >
            <div className="glass-card-hover !rounded-none overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  {item.veg && (
                    <span className="inline-flex items-center gap-1 bg-emerald-600/90 text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 backdrop-blur-sm">
                      <Leaf className="w-3 h-3" /> Veg
                    </span>
                  )}
                  {item.vegan && (
                    <span className="inline-flex items-center gap-1 bg-green-700/90 text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 backdrop-blur-sm">
                      Vegan
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 bg-primary/90 text-white text-xs font-bold px-3 py-1 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-white" /> Bestseller
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-heading text-lg mb-1">{item.name}</h4>
                <p className="font-body text-xs text-muted-foreground mb-3 leading-relaxed">
                  {item.desc}
                </p>
                <span className="font-ui text-base font-bold text-primary">
                  {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────── Ambiance Gallery Strip (CSS-driven, infinite, no flicker) ─────────────── */

const AmbianceGallery = () => {
  const doubledImages = [...galleryImages, ...galleryImages];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-[hsl(var(--foreground))] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-[hsl(var(--foreground))] to-transparent" />

      <div className="cafe-gallery-track">
        {doubledImages.map((img, i) => (
          <div
            key={`gal-${i}`}
            className="flex-shrink-0 w-[280px] md:w-[360px] h-[280px] md:h-[340px] mx-2 overflow-hidden group"
          >
            <img
              src={img}
              alt={`Café ambiance ${(i % galleryImages.length) + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────── Main Cafe Page ─────────────── */

const Cafe = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cafeHero}
            alt="Star Café ambiance"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <Coffee className="w-4 h-4 text-primary" />
            <span className="font-ui text-xs uppercase tracking-[0.2em] text-white/90 font-semibold">
              Star Café
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 italic leading-tight"
            style={{
              textShadow:
                "0 4px 32px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            Where Every Sip
            <br />
            <span style={{ color: "#F59620" }}>Tells a Story</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
          >
            Handcrafted coffees, fresh smoothies, and artisan bites — experience
            the warmth of Star Café nestled inside Star Food & Banquet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() =>
                menuRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary rounded-full text-base px-10 py-4"
            >
              Explore Our Café
            </button>
            <Link
              to="/contact"
              className="btn-outline-white rounded-full text-base px-10 py-4"
            >
              Reserve a Table
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* ══════════ MENU ══════════ */}
      <section ref={menuRef} className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-subtitle mb-3">What We Serve</p>
            <h2 className="section-title mb-4">Our Café Menu</h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Freshly prepared beverages, hearty snacks, and indulgent desserts
              — all crafted with love.
            </p>
          </motion.div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {menuCategories.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(i)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-ui text-sm transition-all duration-300 ${activeCategory === i
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.title}
              </button>
            ))}
          </div>

          {/* Menu items grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
          >
            {menuCategories[activeCategory].items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="glass-card-hover !rounded-none p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-heading text-lg leading-tight">
                        {item.name}
                      </h4>
                      {item.bestseller && (
                        <span className="inline-flex items-center gap-1 bg-primary/15 text-primary text-[10px] uppercase tracking-wider font-bold px-2 py-0.5">
                          <Flame className="w-3 h-3" /> Best
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1.5 ml-2 flex-shrink-0">
                      {item.veg && (
                        <span
                          className="w-5 h-5 rounded flex items-center justify-center border-2 border-emerald-600"
                          title="Vegetarian"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        </span>
                      )}
                      {item.vegan && (
                        <span className="inline-flex items-center gap-0.5 bg-green-100 text-green-700 text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded">
                          <Leaf className="w-2.5 h-2.5" />V
                        </span>
                      )}
                      {item.veg === false && (
                        <span
                          className="w-5 h-5 rounded flex items-center justify-center border-2 border-red-600"
                          title="Non-Vegetarian"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <span className="font-ui text-base font-bold text-primary">
                    {item.price}
                  </span>
                  <span className="font-body text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                    {item.veg ? "Vegetarian" : "Non-Veg"}
                    {item.vegan ? " · Vegan" : ""}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ FEATURED / SIGNATURE ITEMS ══════════ */}
      <section className="py-20 md:py-28 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="section-subtitle mb-3">Chef's Picks</p>
            <h2 className="section-title mb-4">Signature Favourites</h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              The crowd-pleasers that keep our guests coming back for more.
            </p>
          </motion.div>
        </div>

        <SignatureCarousel />
      </section>

      {/* ══════════ AMBIANCE GALLERY STRIP ══════════ */}
      <section className="py-20 md:py-28 bg-foreground overflow-hidden">
        <div className="container mx-auto px-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="uppercase tracking-[0.2em] text-sm font-ui font-semibold text-primary mb-3">
              The Vibe
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">
              Step Inside Our Café
            </h2>
            <p className="font-body text-white/60 max-w-xl mx-auto">
              A cozy haven of warm lights, aromatic brews, and unforgettable
              conversations.
            </p>
          </motion.div>
        </div>

        <AmbianceGallery />
      </section>

      {/* ══════════ OPENING HOURS + RESERVE TABLE CTA ══════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-secondary/5 via-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-subtitle mb-3">Plan Your Visit</p>
              <h2 className="section-title mb-8">Opening Hours</h2>

              <div className="space-y-4">
                {[
                  { day: "Monday – Friday", time: "7:00 AM – 10:00 PM" },
                  { day: "Saturday", time: "8:00 AM – 11:00 PM" },
                  { day: "Sunday", time: "8:00 AM – 9:00 PM" },
                ].map((row) => (
                  <div
                    key={row.day}
                    className="flex items-center justify-between glass-card !rounded-none px-6 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-body font-medium">{row.day}</span>
                    </div>
                    <span className="font-ui text-sm font-semibold text-primary">
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-body text-sm">
                    Inside Star Food & Banquet, Glassford Street, New York
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-body text-sm">1800 - 123 456 789</span>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card !rounded-none p-10 md:p-14 text-center relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/10" />
                <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-secondary/10" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6">
                    <Coffee className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-3xl md:text-4xl italic mb-4">
                    Reserve Your
                    <br />
                    <span className="text-primary">Table</span>
                  </h3>
                  <p className="font-body text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                    Whether it's a catch-up with friends or a quiet afternoon
                    with a book — your favourite corner awaits.
                  </p>
                  <Link
                    to="/contact"
                    className="btn-primary rounded-full text-base px-10 py-4"
                  >
                    Book a Table
                  </Link>
                  <p className="font-body text-xs text-muted-foreground/60 mt-4">
                    Walk-ins always welcome · No minimum order
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cafe;
