import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import aboutImg from "@/assets/about-venue.jpg";
import { Award, Users, Clock, Star } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", desc: "We pursue perfection in every detail, ensuring flawless execution." },
  { icon: Users, title: "Dedication", desc: "Our team is passionately committed to bringing your vision to life." },
  { icon: Clock, title: "Reliability", desc: "Timely, professional, and always exceeding expectations." },
  { icon: Star, title: "Creativity", desc: "Innovative designs that make every event uniquely memorable." },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero */}
      <section className="relative pt-24 pb-24 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5">
        <div className="container mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-3">Our Story</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-5xl md:text-6xl italic">About Star Food & Banquet</motion.h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.img initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} src={aboutImg} alt="Venue" className=" w-full" />
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="section-title mb-6">A Legacy of Star Food & Banquet Since 2010</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                For over 15 years, Star Food & Banquet has been the premier choice for event management and banquet services.
                What began as a small catering company has grown into a full-service event planning powerhouse.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Our team of seasoned professionals brings creativity, precision, and passion to every event.
                We believe that every celebration tells a story, and we're here to make yours extraordinary.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-3">What Drives Us</p>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8 text-center">
                <v.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-xl mb-2">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{v.desc}</p>
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

export default About;
