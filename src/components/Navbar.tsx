import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Food Menu", path: "/food-menu" },
  { label: "Events", path: "/events" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  // Always solid white regardless of scroll or page
  const headerBg = scrolled ? "bg-white shadow-lg" : "bg-white shadow-sm";

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      {/* Top bar – hidden on scroll */}
      <div className={`transition-all duration-300 overflow-hidden ${scrolled ? "max-h-0 opacity-0" : "max-h-[60px] opacity-100 border-b border-border/50"}`}>
        <div className="container mx-auto px-6 py-2.5 flex items-center justify-between text-sm font-body">
          <span className="hidden md:block text-muted-foreground">12356 Glassford Street, New York, USA</span>
          <span className="hidden md:block text-muted-foreground">Office Hours: 9:00 - 5:00 pm</span>
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <Phone className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">1800 - 123 456 789</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo image — always shown in natural colors */}
        <Link to="/" className="flex items-center">
          <img
            src={logoImg}
            alt="Star Food & Banquet Private Limited"
            className="h-14 w-auto object-contain transition-all duration-300"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-ui text-sm uppercase tracking-wider transition-colors duration-300 ${location.pathname === link.path
                ? "text-primary font-semibold"
                : "text-foreground hover:text-primary"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center justify-center btn-primary rounded-full text-sm px-6 py-2.5"
        >
          Request a Quote
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground transition-colors hover:text-primary"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border shadow-xl"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {/* Logo in mobile menu */}
              <div className="flex justify-center mb-2">
                <img
                  src={logoImg}
                  alt="Star Food & Banquet"
                  className="h-12 w-auto object-contain"
                />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-ui text-sm uppercase tracking-wider py-2 border-b border-border/40 transition-colors hover:text-primary ${location.pathname === link.path ? "text-primary font-semibold" : "text-foreground"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" className="btn-primary rounded-full text-sm text-center mt-4">
                Request a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
