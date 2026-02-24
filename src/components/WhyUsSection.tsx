import { motion } from "framer-motion";
import { Utensils, Heart, Leaf, Users, Award, Settings } from "lucide-react";

const features = [
  { icon: Utensils, title: "Exclusive Design", desc: "Bespoke event designs tailored to your unique style and vision." },
  { icon: Heart, title: "Client Focused", desc: "Your satisfaction is our top priority from start to finish." },
  { icon: Leaf, title: "Fresh Ingredients", desc: "Farm-to-table sourcing for the finest culinary experiences." },
  { icon: Users, title: "Diverse Client Base", desc: "Trusted by individuals, corporations, and celebrities alike." },
  { icon: Award, title: "Award Winning", desc: "Recognized excellence in event management and catering." },
  { icon: Settings, title: "Flexible Services", desc: "Customizable packages to fit every occasion and budget." },
];

const WhyUsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="w-12 h-0.5 bg-primary mb-6" />
          <h2 className="section-title mb-3">Why Us</h2>
          <p className="section-subtitle">For All Your Event Needs</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-5"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-secondary flex items-center justify-center">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl mb-2">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
