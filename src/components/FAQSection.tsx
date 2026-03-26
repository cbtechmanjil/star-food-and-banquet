import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import { apiGet } from "@/lib/api";

const FAQSection = () => {
  const { data: faqsData, isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const json = await apiGet("/faqs");
      return json.data;
    }
  });

  const faqs = faqsData || [];

  if (isLoading && faqs.length === 0) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isLoading && faqs.length === 0) return null;
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
            {faqs.map((faq: any, i: number) => (
              <AccordionItem key={faq._id || i} value={`item-${i}`} className="bg-card/65 backdrop-blur-[20px] border border-border px-6 overflow-hidden" style={{ boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.08)" }}>
                <AccordionTrigger
                  className="font-heading text-lg text-foreground hover:no-underline py-5 hover:text-primary transition-colors"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
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
