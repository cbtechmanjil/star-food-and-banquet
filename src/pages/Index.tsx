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
import PageSEO from "@/components/PageSEO";
import { PAGE_META, BUSINESS_INFO } from "@/lib/seo";

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Banquet & Event Services",
    "provider": { "@id": `${BUSINESS_INFO.url}/#business` },
    "serviceType": [
      "Wedding Venue",
      "Banquet Hall",
      "Event Venue",
      "Corporate Event Venue",
      "Birthday Party Venue",
      "Catering Service",
    ],
    "areaServed": BUSINESS_INFO.areaServed,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <PageSEO
        title={PAGE_META.home.title}
        description={PAGE_META.home.description}
        canonical={PAGE_META.home.canonical}
        jsonLd={homeJsonLd}
      />
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
