import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransitionLayout from "@/components/transitions/PageTransitionLayout";
import { dispatchTitleChange } from "@/components/transitions/titleEmitter";
import Index from "./pages/Index";
import About from "./pages/About";
import FoodMenu from "./pages/FoodMenu";
import Cafe from "./pages/Cafe";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BackToTop from "./components/BackToTop";
import { useEffect } from "react";

const queryClient = new QueryClient();

const routeTitles: Record<string, string> = {
  "/": "Home",
  "/about": "About Us",
  "/food-menu": "Food Menu",
  "/our-cafe": "Our Café",
  "/events": "Events",
  "/gallery": "Gallery",
  "/contact": "Contact",
};

function AnimatedRoutes() {
  const location = useLocation();
  const pageTitle = routeTitles[location.pathname] || "";

  useEffect(() => {
    dispatchTitleChange(pageTitle);
  }, [pageTitle]);

  return (
    <AnimatePresence mode="wait">
      <PageTransitionLayout key={location.pathname} title={pageTitle}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/food-menu" element={<FoodMenu />} />
          <Route path="/our-cafe" element={<Cafe />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransitionLayout>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BackToTop />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
