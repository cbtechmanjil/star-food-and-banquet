/**
 * SEO metadata constants for Star Banquet Pepsicola.
 * Update values here to reflect any changes to the business.
 *
 * Remaining TODOs:
 *   BUSINESS_ADDRESS  – add the exact street address
 *   BUSINESS_COORDS   – update GPS coordinates to exact location
 *   SOCIAL_LINKS      – uncomment sameAs entries once social pages are ready
 */

export const SITE_URL = "https://starfoodbanquet.com";
export const SITE_NAME = "Star Banquet Pepsicola";

// ─── Business info ────────────────────────────────────────────────────────────
export const BUSINESS_INFO = {
  name: "Star Banquet Pepsicola",
  legalName: "Star Food & Banquet Pvt. Ltd.",
  description:
    "Premier banquet hall and event venue in Pepsicola, Kathmandu offering weddings, receptions, corporate events, birthday parties, and catering services.",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: "+977-9763488492",
  email: "starfoodbanquet@gmail.com",
  address: {
    streetAddress: "Pepsicola", // TODO: add exact street address
    addressLocality: "Pepsicola",
    addressRegion: "Bagmati Province",
    postalCode: "44600",
    addressCountry: "NP",
  },
  geo: {
    latitude: "27.7172",  // TODO: update with exact GPS coordinates
    longitude: "85.3240",
  },
  areaServed: ["Pepsicola", "Kathmandu", "Bhaktapur", "Lalitpur", "Nepal"],
  openingHours: [
    "Sun-Sat 08:00-22:00",
  ],
  priceRange: "$$",
  servesCuisine: ["Nepali", "Indian", "Continental"],
  // TODO: uncomment once social pages are live
  sameAs: [
    // "https://www.facebook.com/starfoodbanquet",
    // "https://www.instagram.com/starfoodbanquet",
  ],
};

// ─── Per-page metadata ────────────────────────────────────────────────────────
export const PAGE_META: Record<
  string,
  { title: string; description: string; canonical: string }
> = {
  home: {
    title: "Star Banquet Pepsicola | Premier Banquet Hall & Event Venue in Kathmandu",
    description:
      "Star Banquet Pepsicola offers elegant banquet halls for weddings, receptions, corporate events, birthday parties and catering in Pepsicola, Kathmandu. Book your event today.",
    canonical: `${SITE_URL}/`,
  },
  about: {
    title: "About Us | Star Banquet Pepsicola – Kathmandu's Trusted Event Venue",
    description:
      "Learn about Star Banquet Pepsicola – our story, values and commitment to creating unforgettable celebrations in the heart of Kathmandu since 2010.",
    canonical: `${SITE_URL}/about`,
  },
  foodMenu: {
    title: "Banquet Menu | Star Banquet Pepsicola – Gold & Diamond Packages",
    description:
      "Explore our Gold and Diamond banquet menu packages. Fresh Nepali, Indian and Continental dishes crafted for weddings, receptions and special events in Pepsicola.",
    canonical: `${SITE_URL}/food-menu`,
  },
  cafe: {
    title: "Our Café | Star Food & Café Pepsicola – Coffee, Snacks & More",
    description:
      "Visit Star Café at Pepsicola for freshly brewed coffee, smoothies, snacks and light meals. A perfect spot for families and friends in Kathmandu.",
    canonical: `${SITE_URL}/our-cafe`,
  },
  events: {
    title: "Events & Services | Weddings, Corporate Events, Parties in Kathmandu",
    description:
      "From dream weddings and corporate galas to birthday celebrations, Star Banquet Pepsicola offers full-service event planning and catering packages in Kathmandu.",
    canonical: `${SITE_URL}/events`,
  },
  gallery: {
    title: "Gallery | Star Banquet Pepsicola – Wedding & Event Photos",
    description:
      "Browse our gallery of stunning weddings, corporate events, parties and venue setups at Star Banquet Pepsicola, Kathmandu.",
    canonical: `${SITE_URL}/gallery`,
  },
  contact: {
    title: "Contact | Book Your Event at Star Banquet Pepsicola, Kathmandu",
    description:
      "Get in touch with Star Banquet Pepsicola to book your wedding, corporate event or party. Located in Pepsicola, Kathmandu, Nepal. Request a quote today.",
    canonical: `${SITE_URL}/contact`,
  },
  blog: {
    title: "Blog & Tips | Expert Wedding & Event Planning in Kathmandu",
    description:
      "Wedding tips, event planning guides and banquet hall checklists. Expert advice from Star Banquet Pepsicola to make your Kathmandu celebration unforgettable.",
    canonical: `${SITE_URL}/blog`,
  },
};
