import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import aboutImg from "@/assets/about-venue.jpg";
import { Award, Users, Clock, Star } from "lucide-react";
import PageSEO from "@/components/PageSEO";
import { PAGE_META } from "@/lib/seo";

const values = [
  { icon: Award, title: "Excellence", desc: "We pursue perfection in every detail, ensuring flawless execution." },
  { icon: Users, title: "Dedication", desc: "Our team is passionately committed to bringing your vision to life." },
  { icon: Clock, title: "Reliability", desc: "Timely, professional, and always exceeding expectations." },
  { icon: Star, title: "Creativity", desc: "Innovative designs that make every event uniquely memorable." },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <PageSEO
        title={PAGE_META.about.title}
        description={PAGE_META.about.description}
        canonical={PAGE_META.about.canonical}
      />
      <Navbar />
      {/* Hero */}
      <section className="relative pt-24 pb-24 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5">
        <div className="container mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-3">Our Story</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-5xl md:text-6xl italic">About Star Banquet Pepsicola</motion.h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.img initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} src={aboutImg} alt="Star Banquet Pepsicola interior – elegant banquet hall setup in Kathmandu" className=" w-full" />
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="section-title mb-6">A Legacy of Star Food & Banquet Since 2010</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Welcome to Star Food and Banquet Pepsicola, one of the most trusted destinations for banquet services, wedding venues, and event spaces in Kathmandu. Conveniently located in Pepsicola, we offer the perfect blend of delicious dining, elegant ambiance, and exceptional hospitality for both everyday meals and special occasions.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                At Star Food and Banquet, we proudly serve a wide range of Nepali, Indian, and international cuisines, prepared using fresh ingredients and crafted with passion. Whether you're planning a family dinner, casual lunch, or a romantic evening, our menu is designed to satisfy every taste and create a memorable dining experience.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                As a leading banquet hall in Pepsicola, we specialize in hosting weddings, receptions, birthday parties, engagement ceremonies, corporate events, and social gatherings in Kathmandu. Our spacious and beautifully designed banquet halls provide the ideal setting for events of all sizes. From customized décor and seating arrangements to professional catering services, our experienced team ensures every detail is handled with care.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Our venue is thoughtfully designed to offer comfort, style, and convenience, making us a preferred choice for those looking for a party palace or event venue in Kathmandu. With a welcoming atmosphere, attentive service, and facilities suitable for families, including a play area for children, we create experiences that guests truly enjoy.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                At Star Banquet Pepsicola, we don’t just host events—we create lasting memories. Whether you're celebrating a wedding or organizing a corporate function, we are committed to making your occasion seamless and unforgettable.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed font-semibold text-primary">
                Book your event today and experience one of the best banquet halls in Pepsicola, Kathmandu.
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
