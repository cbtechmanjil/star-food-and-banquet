import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import logoImg from "@/assets/logo.png";
import { useContactSettings } from "@/hooks/use-contact-settings";

const Footer = () => {
  const { data: contact } = useContactSettings();
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <img src={logoImg} alt="Star Food & Banquet" className="h-16 w-auto object-contain mb-6" />
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
              Premium event management and banquet services for weddings, parties, corporate events, and private celebrations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-ui text-sm uppercase tracking-wider mb-6 font-semibold text-white">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "About", path: "/about" },
                { label: "Food Menu", path: "/food-menu" },
                { label: "Our Café", path: "/our-cafe" },
                { label: "Events", path: "/events" },
                { label: "Gallery", path: "/gallery" },
                { label: "Contact", path: "/contact" },
              ].map((l) => (
                <Link key={l.label} to={l.path} className="font-body text-sm text-primary-foreground/60 hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-ui text-sm uppercase tracking-wider mb-6 font-semibold text-white">Services</h4>
            <div className="flex flex-col gap-3 font-body text-sm text-primary-foreground/60">
              <span>Wedding Planning</span>
              <span>Corporate Events</span>
              <span>Birthday Parties</span>
              <span>Catering Services</span>
              <span>Venue Decoration</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-ui text-sm uppercase tracking-wider mb-6 font-semibold text-white">Contact</h4>
            <div className="flex flex-col gap-4 font-body text-sm text-primary-foreground/60">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{contact?.address || "12356 Glassford Street, New York, USA"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{contact?.phone || "1800 - 123 456 789"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{contact?.email || "hello@starfoodandbanquet.com"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{contact?.workingHours || "Mon - Fri: 9:00 AM - 5:00 PM"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center flex flex-col items-center gap-2">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Star Food & Banquet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
