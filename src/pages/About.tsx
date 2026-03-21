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
                Welcome to Star Food and Banquet, the perfect destination where delightful dining meets unforgettable celebrations. Located in the heart of the city, Star Food and Banquet is a family-friendly restaurant and event space that brings people together through great food, warm hospitality, and joyful experiences.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                At Star Food and Banquet, we take pride in offering a diverse menu featuring delicious local and international dishes prepared with fresh ingredients and a passion for flavor. Whether you're craving a comforting meal with family, a fun lunch with friends, or a romantic dinner, our culinary team crafts every dish with care to satisfy every palate.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                We also offer spacious and elegant banquet halls ideal for weddings, receptions, corporate events, birthday parties, anniversaries, and social gatherings. Our dedicated event team works closely with you to tailor every detail—from seating arrangements to décor and catering—so your special moment becomes a cherished memory.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Designed with comfort and style in mind, our venue boasts a welcoming ambiance, attentive service, and a comfortable play area to keep younger guests entertained. At Star Food and Banquet, every visit is more than just a meal—it's an experience.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Come savor the flavors, celebrate life's special occasions, and create unforgettable moments with us at Star Food and Banquet.
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
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card-hover !rounded-none p-8 text-center">
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
