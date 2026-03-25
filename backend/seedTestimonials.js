const Testimonial = require('./models/Testimonial');

const seedTestimonials = async () => {
  try {
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding Testimonials...');
      const defaultTestimonials = [
        {
          text: "Star Food & Banquet transformed our wedding into a fairy tale. Every detail was perfect — from the floral arrangements to the exquisite catering. Truly an unforgettable experience.",
          name: "Sarah & James",
          role: "Wedding Couple",
        },
        {
          text: "Our corporate gala was a resounding success thanks to the Star Food & Banquet team. Professional, creative, and incredibly attentive to our needs.",
          name: "Michael Chen",
          role: "CEO, TechCorp",
        },
        {
          text: "The birthday celebration they organized for my daughter was beyond anything I could have imagined. The team went above and beyond!",
          name: "Amanda Wilson",
          role: "Private Client",
        },
      ];
      await Testimonial.insertMany(defaultTestimonials);
      console.log('✅ Testimonials seeded');
    }
  } catch (err) {
    console.error('❌ Failed to seed Testimonials:', err);
  }
};

module.exports = seedTestimonials;
