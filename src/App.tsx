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
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import BackToTop from "./components/BackToTop";
import ScrollToTop from "./components/ScrollToTop";
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
  "/login": "Admin Login",
  "/admin": "Admin Dashboard",
};

function AnimatedRoutes() {
  const location = useLocation();
  const pageTitle = routeTitles[location.pathname] || "";

  useEffect(() => {
    dispatchTitleChange(pageTitle);
  }, [pageTitle]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransitionLayout title={pageTitle}><Index /></PageTransitionLayout>} />
        <Route path="/about" element={<PageTransitionLayout title={pageTitle}><About /></PageTransitionLayout>} />
        <Route path="/food-menu" element={<PageTransitionLayout title={pageTitle}><FoodMenu /></PageTransitionLayout>} />
        <Route path="/our-cafe" element={<PageTransitionLayout title={pageTitle}><Cafe /></PageTransitionLayout>} />
        <Route path="/events" element={<PageTransitionLayout title={pageTitle}><Events /></PageTransitionLayout>} />
        <Route path="/gallery" element={<PageTransitionLayout title={pageTitle}><Gallery /></PageTransitionLayout>} />
        <Route path="/contact" element={<PageTransitionLayout title={pageTitle}><Contact /></PageTransitionLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
