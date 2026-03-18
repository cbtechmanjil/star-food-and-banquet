import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutImg from "@/assets/about-venue.jpg";

const AboutSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch max-w-full mx-auto overflow-hidden">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img src={aboutImg} alt="Elegant venue setup" className="w-full h-full object-cover min-h-[400px]" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card p-12 lg:p-16 flex flex-col justify-center"
          >
            <div className="w-12 h-0.5 bg-primary mb-6" />
            <h2 className="section-title mb-3">About Us</h2>
            <p className="section-subtitle mb-8">Discover Our Story</p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Welcome to Star Food and Banquet, the perfect destination where delightful dining meets unforgettable celebrations.
              Located in the heart of the city, Star Food and Banquet is a family-friendly restaurant and event space that brings people together through great food, warm hospitality, and joyful experiences.
              At Star Food and Banquet, we take pride in offering a diverse menu featuring delicious local and international dishes prepared with fresh ingredients and a passion for flavor.
            </p>
            <Link
              to="/about"
              className="font-ui text-sm uppercase tracking-[0.15em] text-primary font-medium inline-flex items-center gap-3 group"
            >
              Read Full Story
              <span className="w-8 h-px bg-primary transition-all duration-300 group-hover:w-16" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
