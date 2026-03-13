import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How far in advance should I book?", a: "We recommend booking at least 3-6 months in advance for weddings and large events, and 4-6 weeks for smaller gatherings to ensure availability." },
  { q: "Do you provide catering services?", a: "Yes! We offer full-service catering with customizable menus featuring local, seasonal ingredients. Our executive chef works with you to create the perfect menu." },
  { q: "Can I customize my event package?", a: "Absolutely. Every event is unique, and our packages are fully customizable to match your vision, preferences, and budget." },
  { q: "What venues do you offer?", a: "We have multiple stunning indoor and outdoor venues that can accommodate from 50 to 500 guests, each with its own distinctive character." },
  { q: "Is there a minimum guest count?", a: "Our minimum guest count varies by venue and package. We happily accommodate intimate gatherings of 20 guests up to grand celebrations of 500+." },
  { q: "Do you handle decorations and setup?", a: "Yes, we offer comprehensive decoration and setup services. Our in-house design team works with you to create the perfect ambiance for your event." },
  { q: "What is your cancellation policy?", a: "We understand plans can change. Our flexible cancellation policy allows full refund up to 30 days before the event. Please contact our team for specific details." },
];

const FAQSection = () => {
  return (
    <section
      className="py-24"
      style={{ background: "linear-gradient(180deg, hsl(30 20% 98%) 0%, hsl(231 56% 36% / 0.04) 100%)" }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-3">Have Questions?</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card/65 backdrop-blur-[20px] border border-border px-6 overflow-hidden" style={{ boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.08)" }}>
                <AccordionTrigger
                  className="font-heading text-lg text-foreground hover:no-underline py-5 hover:text-primary transition-colors"
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
