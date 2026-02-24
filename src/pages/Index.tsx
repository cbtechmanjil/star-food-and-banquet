import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import StatsSection from "@/components/StatsSection";
import BookingTimeline from "@/components/BookingTimeline";
import TestimonialsSection from "@/components/TestimonialsSection";
import InfiniteScrollGallery from "@/components/InfiniteScrollGallery";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyUsSection />
      <StatsSection />
      <BookingTimeline />
      <TestimonialsSection />
      <InfiniteScrollGallery />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
