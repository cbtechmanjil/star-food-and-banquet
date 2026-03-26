import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import {
  Salad, ChefHat, Flame, CookingPot, IceCreamCone, 
  Coffee, Sparkles, Crown, Gem, Leaf, Music, Cherry, Loader2
} from "lucide-react";
import { apiGet } from "@/lib/api";

/* ───────────────────────────── TYPES ───────────────────────────── */
const iconMap: Record<string, any> = {
  Salad, ChefHat, Flame, CookingPot, IceCreamCone, 
  Coffee, Sparkles, Crown, Gem, Leaf, Music, Cherry
};

interface MenuCategory {
  name: string;
  subtitle?: string;
  icon: string;
  items: string[];
}

interface MenuData {
  _id: string;
  tab: string;
  categories: MenuCategory[];
}

/* ────────────────────── CATEGORY CARD ────────────────────── */
const CategoryCard = ({
  category,
  theme,
  index,
}: {
  category: MenuCategory;
  theme: any;
  index: number;
}) => {
  const Icon = iconMap[category.icon] || ChefHat;
  const isMainCourse = category.name === "Main Course";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="relative"
    >
      <div
        className="border backdrop-blur-sm overflow-hidden transition-shadow duration-500 hover:shadow-xl rounded-2xl"
        style={{
          background: theme.cardBg,
          borderColor: theme.accentBorder,
          boxShadow: `0 4px 30px ${theme.accentGlow}`,
        }}
      >
        <div
          className="px-6 py-5 md:px-8 md:py-6 flex items-center gap-4 border-b"
          style={{
            background: theme.headerGradient,
            borderColor: theme.accentBorder,
          }}
        >
          <div
            className="w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-xl"
            style={{ background: theme.iconBg }}
          >
            <Icon className="w-5 h-5" style={{ color: theme.accent }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-xl md:text-2xl tracking-tight">
              {category.name}
            </h3>
            {category.subtitle && (
              <span
                className="inline-block mt-1 px-3 py-0.5 font-ui text-[10px] uppercase tracking-widest rounded-full"
                style={{
                  background: theme.tagBg,
                  color: theme.tagText,
                }}
              >
                {category.subtitle}
              </span>
            )}
          </div>
        </div>

        <div className="px-6 py-5 md:px-8 md:py-6">
          {isMainCourse ? (
            <div className="space-y-4">
              {category.items.map((item, i) => {
                const parts = item.split(": ");
                const label = parts[0];
                const options = parts.slice(1).join(": ");
                return (
                  <div key={i} className="pb-4 last:pb-0 border-b last:border-0" style={{ borderColor: theme.accentBorder }}>
                    <p
                      className="font-heading text-sm md:text-base font-semibold mb-1.5"
                      style={{ color: theme.accent }}
                    >
                      {label}
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {options}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-2.5">
              {category.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2 py-1">
                  <span
                    className="mt-2 block w-1.5 h-1.5 flex-shrink-0"
                    style={{ background: theme.accent, borderRadius: "1px" }}
                  />
                  <span className="font-body text-sm text-foreground/85 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ──────────────────────── THEME TOKENS ──────────────────────── */
const themes: Record<string, any> = {
  Gold: {
    accent: "hsl(33 91% 54%)",
    accentLight: "hsl(33 91% 54% / 0.12)",
    accentBorder: "hsl(33 91% 54% / 0.25)",
    accentGlow: "hsl(33 91% 54% / 0.35)",
    gradient: "linear-gradient(135deg, hsl(33 80% 95%) 0%, hsl(40 60% 97%) 50%, hsl(33 80% 95%) 100%)",
    cardBg: "rgba(255,255,255,0.85)",
    tabActiveBg: "hsl(33 91% 54%)",
    tabActiveText: "#fff",
    decorLine: "linear-gradient(90deg, transparent, hsl(33 91% 54%), transparent)",
    tagBg: "hsl(33 91% 54% / 0.10)",
    tagText: "hsl(33 91% 40%)",
    headerGradient: "linear-gradient(135deg, hsl(33 80% 92% / 0.5) 0%, hsl(40 60% 96%) 100%)",
    iconBg: "hsl(33 91% 54% / 0.12)",
  },
  Diamond: {
    accent: "hsl(231 56% 36%)",
    accentLight: "hsl(231 56% 36% / 0.08)",
    accentBorder: "hsl(231 56% 36% / 0.20)",
    accentGlow: "hsl(231 56% 36% / 0.25)",
    gradient: "linear-gradient(135deg, hsl(231 30% 97%) 0%, hsl(240 20% 98%) 50%, hsl(231 30% 97%) 100%)",
    cardBg: "rgba(255,255,255,0.88)",
    tabActiveBg: "hsl(231 56% 36%)",
    tabActiveText: "#fff",
    decorLine: "linear-gradient(90deg, transparent, hsl(231 56% 36%), transparent)",
    tagBg: "hsl(231 56% 36% / 0.08)",
    tagText: "hsl(231 56% 30%)",
    headerGradient: "linear-gradient(135deg, hsl(231 50% 95% / 0.5) 0%, hsl(240 20% 98%) 100%)",
    iconBg: "hsl(231 56% 36% / 0.10)",
  },
};

/* ──────────────────────── PAGE COMPONENT ──────────────────────── */
const FoodMenu = () => {
  const [activeTab, setActiveTab] = useState<"Gold" | "Diamond">("Gold");
  const theme = themes[activeTab];

  const { data: menus, isLoading } = useQuery<MenuData[]>({
    queryKey: ['banquetMenus'],
    queryFn: async () => {
      const json = await apiGet("/banquet");
      return json.data;
    }
  });

  const activeMenu = menus?.find((m) => m.tab === activeTab);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-24 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-subtitle mb-3"
          >
            Culinary Excellence
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl italic"
          >
            Our Menu
          </motion.h1>
        </div>
      </section>

      {/* Sticky Tab Bar */}
      <div
        className="sticky z-[45] border-b transition-colors duration-500"
        style={{
          top: "80px",
          background: theme.gradient,
          borderColor: theme.accentBorder,
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 py-4">
            {(["Gold", "Diamond"] as const).map((tab) => {
              const isActive = activeTab === tab;
              const TabIcon = tab === "Gold" ? Crown : Gem;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative flex items-center gap-2.5 px-8 py-3 font-ui text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-400 focus:outline-none rounded-xl"
                  style={{
                    background: isActive ? themes[tab].tabActiveBg : "transparent",
                    color: isActive ? themes[tab].tabActiveText : themes[tab].accent,
                    border: `1.5px solid ${isActive ? themes[tab].tabActiveBg : themes[tab].accentBorder}`,
                    boxShadow: isActive ? `0 6px 24px ${themes[tab].accentGlow}` : "none",
                  }}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab} Menu
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <section
        className="py-16 md:py-24 transition-colors duration-700"
        style={{ background: theme.gradient }}
      >
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Decorative header for active menu */}
          <motion.div
            key={activeTab + "-header"}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-14"
          >
            <h2
              className="font-heading text-4xl md:text-5xl italic mb-3"
              style={{ color: theme.accent }}
            >
              {activeTab === "Gold" ? "— Gold Menu —" : "◆ Diamond Menu ◆"}
            </h2>
            <div
              className="mx-auto h-px w-48 mb-4"
              style={{ background: theme.decorLine }}
            />
            <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
              {activeTab === "Gold"
                ? "An elegant selection of dishes perfect for celebrations and gatherings."
                : "Our premium package with expanded choices and exclusive additions."}
            </p>
          </motion.div>

          {/* Category cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {activeMenu?.categories?.map((cat, i) => (
                <CategoryCard
                  key={cat.name}
                  category={cat}
                  theme={theme}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default FoodMenu;
