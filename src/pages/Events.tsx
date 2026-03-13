import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import weddingImg from "@/assets/service-wedding.jpg";
import corpImg from "@/assets/service-corporate.jpg";
import partyImg from "@/assets/service-party.jpg";
import eventImg from "@/assets/service-event.jpg";
import { Heart, Briefcase, PartyPopper, Cake, Star, Users } from "lucide-react";

const events = [
  { icon: Heart, title: "Weddings", desc: "From intimate ceremonies to grand celebrations, we create the wedding of your dreams with bespoke planning and flawless execution.", image: weddingImg },
  { icon: Briefcase, title: "Corporate Events", desc: "Impress your clients and team with professionally organized conferences, galas, product launches, and corporate retreats.", image: corpImg },
  { icon: PartyPopper, title: "Private Parties", desc: "Celebrate in style with custom-themed parties featuring exquisite catering, entertainment, and stunning décor.", image: partyImg },
  { icon: Cake, title: "Birthdays", desc: "Make every birthday milestone unforgettable with creative themes, delicious cakes, and joyful experiences.", image: eventImg },
];

const packages = [
  { name: "Silver", price: "$2,500", features: ["Up to 50 guests", "Basic venue décor", "3-course menu", "4-hour event"], highlight: false },
  { name: "Gold", price: "$5,500", features: ["Up to 150 guests", "Premium venue décor", "5-course menu", "6-hour event", "Photography"], highlight: true },
  { name: "Platinum", price: "$12,000", features: ["Up to 300 guests", "Luxury full décor", "7-course menu", "Full-day event", "Photo & Video", "Live entertainment"], highlight: false },
];

const Events = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative pt-24 pb-24  bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5">
        <div className="container mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-3">What We Offer</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-5xl md:text-6xl italic">Our Events</motion.h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {events.map((event, i) => (
              <motion.div key={event.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <img src={event.image} alt={event.title} className=" w-full h-80 object-cover" />
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <event.icon className="w-10 h-10 text-primary mb-4" />
                  <h2 className="font-heading text-3xl mb-4">{event.title}</h2>
                  <p className="font-body text-muted-foreground leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-3">Choose Your Plan</p>
            <h2 className="section-title">Event Packages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`glass-card-hover p-8 text-center ${pkg.highlight ? "ring-2 ring-primary scale-105" : ""}`}>
                {pkg.highlight && <span className="inline-block bg-primary text-primary-foreground font-ui text-xs uppercase tracking-wider px-4 py-1 rounded-full mb-4">Most Popular</span>}
                <h3 className="font-heading text-2xl mb-2">{pkg.name}</h3>
                <p className="font-heading text-4xl text-primary mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="font-body text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <Star className="w-3 h-3 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={pkg.highlight ? "btn-primary w-full" : "btn-outline w-full"}>
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Events;
