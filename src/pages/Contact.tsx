import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", eventType: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll be in touch soon.");
    setFormData({ name: "", email: "", phone: "", eventType: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-40 pb-24"
        style={{ background: "linear-gradient(135deg, hsl(231 56% 36% / 0.08) 0%, hsl(33 91% 54% / 0.06) 100%)" }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-3">
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl italic"
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-3xl mb-8">Let's Plan Your Event</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-10">
                Ready to create something extraordinary? Reach out to us and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Address", value: "12356 Glassford Street, New York, USA" },
                  { icon: Phone, label: "Phone", value: "1800 - 123 456 789" },
                  { icon: Mail, label: "Email", value: "hello@starfood&banquet.com" },
                  { icon: Clock, label: "Hours", value: "Mon - Fri: 9:00 AM - 5:00 PM" },
                ].map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "hsl(33 91% 54% / 0.12)" }}
                    >
                      <info.icon className="w-5 h-5" style={{ color: "hsl(33 91% 54%)" }} />
                    </div>
                    <div>
                      <p className="font-ui text-sm font-semibold text-foreground">{info.label}</p>
                      <p className="font-body text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div
                className="mt-10 rounded-2xl overflow-hidden h-48 flex items-center justify-center"
                style={{ background: "hsl(231 56% 36% / 0.08)", border: "1px solid hsl(231 56% 36% / 0.2)" }}
              >
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: "hsl(231 56% 36%)" }} />
                  <p className="font-ui text-sm text-muted-foreground">12356 Glassford St, New York</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-ui text-sm font-medium text-foreground block mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 transition-all"
                      style={{ "--tw-ring-color": "hsl(33 91% 54% / 0.3)" } as React.CSSProperties}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="font-ui text-sm font-medium text-foreground block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      placeholder="john@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-ui text-sm font-medium text-foreground block mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div>
                    <label className="font-ui text-sm font-medium text-foreground block mb-2">Event Type</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="party">Party</option>
                      <option value="birthday">Birthday</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-ui text-sm font-medium text-foreground block mb-2">Message</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                    placeholder="Tell us about your event..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 rounded-xl py-4">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section moved here */}
      <FAQSection />

      <Footer />
    </div>
  );
};

export default Contact;
