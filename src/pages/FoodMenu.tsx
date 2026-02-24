import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const menuCategories = [
  {
    name: "Starters",
    items: [
      { name: "Bruschetta al Pomodoro", desc: "Toasted ciabatta with fresh tomatoes, basil & olive oil", price: "$14" },
      { name: "Shrimp Cocktail", desc: "Tiger prawns with zesty cocktail sauce", price: "$18" },
      { name: "Caesar Salad", desc: "Romaine, parmesan, croutons, house-made dressing", price: "$12" },
      { name: "Soup du Jour", desc: "Chef's seasonal creation with artisan bread", price: "$10" },
    ],
  },
  {
    name: "Main Course",
    items: [
      { name: "Filet Mignon", desc: "8oz prime beef with truffle mashed potatoes", price: "$48" },
      { name: "Pan-Seared Salmon", desc: "Atlantic salmon with lemon butter sauce & asparagus", price: "$38" },
      { name: "Herb Roasted Chicken", desc: "Free-range chicken with roasted vegetables", price: "$32" },
      { name: "Vegetable Wellington", desc: "Seasonal vegetables in golden puff pastry", price: "$28" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Crème Brûlée", desc: "Classic French custard with caramelized sugar", price: "$14" },
      { name: "Chocolate Fondant", desc: "Warm chocolate cake with vanilla ice cream", price: "$16" },
      { name: "Tiramisu", desc: "Traditional Italian layered mascarpone dessert", price: "$14" },
      { name: "Seasonal Fruit Tart", desc: "Fresh fruits on vanilla custard & crisp pastry", price: "$12" },
    ],
  },
  {
    name: "Beverages",
    items: [
      { name: "Signature Cocktails", desc: "Custom-crafted cocktails for your event", price: "$16" },
      { name: "Premium Wine Selection", desc: "Curated wines from world-class vineyards", price: "$12/glass" },
      { name: "Artisan Coffee", desc: "Freshly brewed specialty coffee", price: "$6" },
      { name: "Fresh Juice Bar", desc: "Seasonal cold-pressed juices", price: "$8" },
    ],
  },
];

const FoodMenu = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative pt-40 pb-24 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-3">Culinary Excellence</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-5xl md:text-6xl italic">Our Menu</motion.h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <Tabs defaultValue="Starters" className="w-full">
            <TabsList className="w-full flex justify-center gap-2 bg-transparent mb-12 flex-wrap">
              {menuCategories.map((cat) => (
                <TabsTrigger key={cat.name} value={cat.name} className="font-ui text-sm uppercase tracking-wider px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {menuCategories.map((cat) => (
              <TabsContent key={cat.name} value={cat.name}>
                <div className="space-y-0">
                  {cat.items.map((item, i) => (
                    <motion.div key={item.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start justify-between py-8 border-b border-border last:border-0">
                      <div>
                        <h3 className="font-heading text-xl mb-1">{item.name}</h3>
                        <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <span className="font-heading text-xl text-primary ml-4 flex-shrink-0">{item.price}</span>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FoodMenu;
