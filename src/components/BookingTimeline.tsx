import { motion } from "framer-motion";
import { Calendar, ClipboardList, Palette, PartyPopper } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Consultation", desc: "Share your vision and requirements with our expert planners." },
  { icon: Palette, title: "Design & Plan", desc: "We craft a detailed plan with custom themes and menus." },
  { icon: Calendar, title: "Coordination", desc: "Our team manages every detail leading up to your event." },
  { icon: PartyPopper, title: "Celebrate", desc: "Enjoy your perfect event while we handle everything." },
];

const BookingTimeline = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-3">Our Process</p>
          <h2 className="section-title">How It Works</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 relative">
                <step.icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-ui font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
              <h3 className="font-heading text-xl mb-2">{step.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingTimeline;
