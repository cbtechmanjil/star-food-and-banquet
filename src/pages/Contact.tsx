import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, QrCode } from "lucide-react";
import { useState } from "react";
import { apiPost } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useContactSettings } from "@/hooks/use-contact-settings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", eventType: "", message: "" });

  const { data: contact } = useContactSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiPost("/messages", formData);
      toast.success("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", phone: "", eventType: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-24 pb-24 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5">
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
                  { icon: MapPin, label: "Address", value: contact?.address || "12356 Glassford Street, New York, USA" },
                  { icon: Phone, label: "Phone", value: contact?.phone || "1800 - 123 456 789" },
                  { icon: Mail, label: "Email", value: contact?.email || "hello@starfoodandbanquet.com" },
                  { icon: Clock, label: "Hours", value: contact?.workingHours || "Mon - Fri: 9:00 AM - 5:00 PM" },
                ].map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "hsl(231 56% 36%)" }}
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

              {/* QR Code for Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10 flex items-center gap-6 p-6 border border-border bg-card/50"
              >
                <div className="flex-shrink-0">
                  <img
                    src="/images/qr-code-map.png"
                    alt="QR Code for Map & Directions"
                    className="w-28 h-28 object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <QrCode className="w-5 h-5" style={{ color: "hsl(231 56% 36%)" }} />
                    <h3 className="font-heading text-xl">Scan for Map</h3>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Scan for Map & Directions
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="bg-card/65 backdrop-blur-[20px] border border-border p-8 md:p-10 space-y-6" style={{ boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.08)" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-ui text-sm font-medium text-foreground block mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 transition-all"
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
                      className="w-full px-4 py-3 border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
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
                      className="w-full px-4 py-3 border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div>
                    <label className="font-ui text-sm font-medium text-foreground block mb-2">Event Type</label>
                    <Select
                      value={formData.eventType}
                      onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                    >
                      <SelectTrigger className="w-full h-[46px] px-4 border border-border bg-background font-body text-sm rounded-none focus:ring-primary/30">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="wedding" className="font-body text-sm">Wedding</SelectItem>
                        <SelectItem value="corporate" className="font-body text-sm">Corporate Event</SelectItem>
                        <SelectItem value="party" className="font-body text-sm">Party</SelectItem>
                        <SelectItem value="birthday" className="font-body text-sm">Birthday</SelectItem>
                        <SelectItem value="other" className="font-body text-sm">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="font-ui text-sm font-medium text-foreground block mb-2">Message</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                    placeholder="Tell us about your event..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 rounded-full py-4">
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
