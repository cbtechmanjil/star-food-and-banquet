const FAQ = require('./models/FAQ');

const faqs = [
  { question: "How far in advance should I book?", answer: "We recommend booking at least 3-6 months in advance for weddings and large events, and 4-6 weeks for smaller gatherings to ensure availability." },
  { question: "Do you provide catering services?", answer: "Yes! We offer full-service catering with customizable menus featuring local, seasonal ingredients. Our executive chef works with you to create the perfect menu." },
  { question: "Can I customize my event package?", answer: "Absolutely. Every event is unique, and our packages are fully customizable to match your vision, preferences, and budget." },
  { question: "What venues do you offer?", answer: "We have multiple stunning indoor and outdoor venues that can accommodate from 50 to 500 guests, each with its own distinctive character." },
  { question: "Is there a minimum guest count?", answer: "Our minimum guest count varies by venue and package. We happily accommodate intimate gatherings of 20 guests up to grand celebrations of 500+." },
  { question: "Do you handle decorations and setup?", answer: "Yes, we offer comprehensive decoration and setup services. Our in-house design team works with you to create the perfect ambiance for your event." },
  { question: "What is your cancellation policy?", answer: "We understand plans can change. Our flexible cancellation policy allows full refund up to 30 days before the event. Please contact our team for specific details." },
];

const seedFaqs = async () => {
  try {
    const count = await FAQ.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding FAQs...');
      await FAQ.insertMany(faqs);
      console.log('✅ FAQs seeded');
    }
  } catch (err) {
    console.error('❌ Error seeding FAQs:', err);
  }
};

module.exports = seedFaqs;
