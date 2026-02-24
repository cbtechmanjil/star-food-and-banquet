import { useRef } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-banquet.jpg";
import aboutImg from "@/assets/about-venue.jpg";
import corpImg from "@/assets/service-corporate.jpg";
import partyImg from "@/assets/service-party.jpg";
import weddingImg from "@/assets/service-wedding.jpg";
import eventImg from "@/assets/service-event.jpg";
import statsBg from "@/assets/stats-bg.jpg";

const galleryImages = [
    { src: heroBg, label: "Grand Ballroom" },
    { src: weddingImg, label: "Dream Wedding" },
    { src: corpImg, label: "Corporate Gala" },
    { src: partyImg, label: "Cocktail Evening" },
    { src: aboutImg, label: "Romantic Setup" },
    { src: eventImg, label: "Birthday Celebration" },
    { src: statsBg, label: "Dance Night" },
];

// Duplicate for seamless infinite loop
const doubledImages = [...galleryImages, ...galleryImages];

const InfiniteScrollGallery = () => {
    const trackRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-24 overflow-hidden" style={{ background: "hsl(231 56% 36%)" }}>
            <div className="container mx-auto px-6 mb-14">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="uppercase tracking-[0.25em] text-sm font-ui font-semibold text-[#F59620] mb-3">
                        Our Portfolio
                    </p>
                    <h2 className="font-heading text-4xl md:text-5xl text-white italic mb-4">
                        Moments We&apos;ve Created
                    </h2>
                    <p className="font-body text-white/70 max-w-xl mx-auto text-base">
                        A glimpse into the beautiful events we&apos;ve had the privilege of hosting.
                    </p>
                </motion.div>
            </div>

            {/* Infinite scroll strip */}
            <div
                className="relative w-full overflow-hidden"
                style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
            >
                <div ref={trackRef} className="scroll-gallery-track">
                    {doubledImages.map((img, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 mx-3 overflow-hidden"
                            style={{ width: "320px", height: "500px" }}
                        >
                            <img
                                src={img.src}
                                alt={img.label}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center mt-12">
                <a href="/gallery" className="btn-outline-white rounded-full px-10 py-3 text-sm font-semibold">
                    View Full Gallery
                </a>
            </div>
        </section>
    );
};

export default InfiniteScrollGallery;
