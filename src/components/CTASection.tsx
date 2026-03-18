import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import flower1 from "@/assets/CTA_Flower1.png";
import flower2 from "@/assets/CTA_Flower2.png";

const CTASection = () => {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(231 56% 36%) 0%, hsl(231 56% 24%) 100%)",
      }}
    >
      {/* Decorative Flowers */}
      <motion.img
        src={flower1}
        alt="Decorative flower"
        className="absolute left-0 bottom-0 w-80 md:w-[450px] max-w-[40vw] opacity-90 object-contain pointer-events-none z-0"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      <motion.img
        src={flower2}
        alt="Decorative flower"
        className="absolute right-0 bottom-0 w-80 md:w-[450px] max-w-[40vw] opacity-90 object-contain pointer-events-none z-0"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="uppercase tracking-[0.25em] text-sm font-ui font-semibold mb-4"
            style={{ color: "#F59620" }}
          >
            Let's Work Together
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-white italic mb-6">
            Ready to Create Something Beautiful?
          </h2>
          <p className="font-body text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let's bring your vision to life. Whether it's a dream wedding, a corporate gala,
            or an intimate celebration, our team is here to make it extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary rounded-full px-10 py-4 text-base"
            >
              Get in Touch
            </Link>
            <Link
              to="/gallery"
              className="btn-outline-white rounded-full px-10 py-4 text-base"
            >
              View Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
