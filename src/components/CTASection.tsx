import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl text-primary-foreground italic mb-6">
            Ready to Create Something Beautiful?
          </h2>
          <p className="font-body text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let's bring your vision to life. Whether it's a dream wedding, a corporate gala,
            or an intimate celebration, our team is here to make it extraordinary.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary-foreground text-primary rounded-xl px-10 py-4 font-body font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
