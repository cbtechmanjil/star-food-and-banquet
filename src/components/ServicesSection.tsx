import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import corpImg from "@/assets/service-corporate.jpg";
import partyImg from "@/assets/service-party.jpg";
import weddingImg from "@/assets/service-wedding.jpg";
import eventImg from "@/assets/service-event.jpg";

const services = [
  { title: "Corporate", image: corpImg, desc: "Professional events that impress" },
  { title: "Parties", image: partyImg, desc: "Unforgettable celebrations" },
  { title: "Weddings", image: weddingImg, desc: "Your dream day, perfected" },
  { title: "Event Planning", image: eventImg, desc: "Full-service coordination" },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-heading text-xl md:text-2xl text-muted-foreground italic max-w-3xl mx-auto leading-relaxed">
            Welcome to Star Food &amp; Banquet, a premier catering and event planning company dedicated to creating extraordinary experiences.
          </p>
        </motion.div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full mx-auto">

          {/* Large left card — Corporate (unchanged) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:row-span-2 relative group overflow-hidden cursor-pointer"
          >
            <img
              src={services[0].image}
              alt={services[0].title}
              className="w-full h-full object-cover min-h-[400px] md:min-h-full transition-transform duration-700 group-hover:scale-110"
            />
            {/* Identical gradient to Corporate — only bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="font-heading text-3xl text-primary-foreground italic">{services[0].title}</h3>
              <p className="font-body text-primary-foreground/80 mt-1">{services[0].desc}</p>
            </div>
          </motion.div>

          {/* Right top — Parties: same gradient as Corporate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group overflow-hidden cursor-pointer"
          >
            <img
              src={services[1].image}
              alt={services[1].title}
              className="w-full h-full min-h-[250px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="font-heading text-2xl text-primary-foreground italic">{services[1].title}</h3>
            </div>
          </motion.div>

          {/* Right bottom row — Weddings + Event Planning: same gradient as Corporate */}
          <div className="grid grid-cols-2 gap-6">
            {services.slice(2).map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="relative group overflow-hidden cursor-pointer"
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-4 left-4 z-10">
                  <h3 className="font-heading text-xl text-primary-foreground italic">{s.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/events" className="btn-primary rounded-full">Explore All Services</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
