import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutImg from "@/assets/about-venue.jpg";
import aboutFlowerImg from "@/assets/about-flower.png";

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
            className="bg-card p-12 lg:p-16 flex flex-col justify-center relative"
          >
            {/* Added flower image in the top right corner */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              src={aboutFlowerImg} 
              alt="Decorative flower" 
              className="absolute top-0 right-0 w-32 md:w-48 opacity-70 pointer-events-none" 
            />
            <div className="w-12 h-0.5 bg-primary mb-6" />
            <h2 className="section-title mb-3">About Us</h2>
            <p className="section-subtitle mb-8">Discover Our Story</p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Welcome to Star Food and Banquet, the perfect destination where delightful dining meets unforgettable celebrations. Located in the heart of the city, Star Food and Banquet is a family-friendly restaurant and event space that brings people together through great food, warm hospitality, and joyful experiences.
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
