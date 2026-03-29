const BlogPost = require('./models/BlogPost');

const blogPosts = [
  {
    title: "Best Wedding Venue in Pepsicola: How to Choose the Right Banquet Hall",
    slug: "best-wedding-venue-pepsicola-how-to-choose",
    excerpt: "Searching for the perfect wedding venue in Pepsicola? Learn the key factors to consider before booking a banquet hall for your big day in Kathmandu.",
    content: "Full content placeholder for weddings in Pepsicola...",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
    metadata: {
      title: "Best Wedding Venue in Pepsicola | Choosing a Banquet Hall",
      description: "Discover how to choose the best wedding venue in Pepsicola, Kathmandu. Expert tips on selecting the right banquet hall for your celebration."
    }
  },
  {
    title: "Top Things to Look for in a Banquet Hall in Kathmandu",
    slug: "top-things-look-for-banquet-hall-kathmandu",
    excerpt: "From capacity to catering, here are the essential things you must check before finalizing a banquet hall in Kathmandu for any type of event.",
    content: "Expert advice on venue selection in Nepal's capital...",
    category: "Planning",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    metadata: {
      title: "What to Look for in a Banquet Hall Kathmandu | Star Banquet",
      description: "Planning an event? Learn the top things to look for when choosing a banquet hall in Kathmandu for weddings, parties, and corporate functions."
    }
  },
  {
    title: "How to Plan a Beautiful Wedding Reception in Kathmandu",
    slug: "how-to-plan-beautiful-wedding-reception-kathmandu",
    excerpt: "Planning a wedding reception in Kathmandu? Follow our step-by-step guide to ensure a seamless and stunning celebration for you and your guests.",
    content: "Guide to reception planning in Kathmandu...",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1465495910483-0d6749eeac90?auto=format&fit=crop&q=80&w=800",
    metadata: {
      title: "Wedding Reception Planning Guide Kathmandu | Star Banquet",
      description: "Plan the perfect wedding reception in Kathmandu with our expert guide. From venue decor to catering, we cover everything you need."
    }
  },
  {
    title: "Best Birthday Party Venue Ideas in Pepsicola for Family Celebrations",
    slug: "best-birthday-party-venue-ideas-pepsicola",
    excerpt: "Looking for a birthday venue in Pepsicola? Explore creative ideas for family-friendly celebrations that children and adults will love.",
    content: "Birthday party ideas for Pepsicola residents...",
    category: "Parties",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
    metadata: {
      title: "Birthday Party Venues Pepsicola | Event Ideas",
      description: "Find the best birthday party venue ideas in Pepsicola. Creative celebration themes and planning tips for family events in Kathmandu."
    }
  },
  {
    title: "Why Star Banquet Pepsicola Is Ideal for Engagement and Reception Events",
    slug: "why-star-banquet-pepsicola-engagement-reception",
    excerpt: "Discover the unique features that make Star Banquet Pepsicola the preferred choice for engagement ceremonies and wedding receptions in Kathmandu.",
    content: "Overview of Star Banquet's ceremony facilities...",
    category: "Planning",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    metadata: {
      title: "Perfect Engagement Venue Pepsicola | Star Banquet",
      description: "Why choose Star Banquet Pepsicola for your engagement? Learn about our elegant spaces and dedicated services for intimate ceremonies."
    }
  },
  {
    title: "Corporate Event Venue in Kathmandu: Choosing the Right Space for Your Team",
    slug: "corporate-event-venue-kathmandu-choosing-space",
    excerpt: "Successful corporate events start with the right venue. Learn how to choose a professional space in Kathmandu for your next seminar or gala.",
    content: "Corporate event planning tips for businesses...",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    metadata: {
      title: "Corporate Event Venues Kathmandu | Business Planning",
      description: "Choosing the right corporate event venue in Kathmandu. Essential tips for team building, seminars, and corporate dinners."
    }
  },
  {
    title: "Catering and Banquet Services in Pepsicola: What Guests Really Expect",
    slug: "catering-banquet-services-pepsicola-guest-expectations",
    excerpt: "Great food is key to a great event. Find out what guests expect from catering and banquet services in Pepsicola, Kathmandu.",
    content: "Deep dive into culinary expectations in Nepal...",
    category: "Catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    metadata: {
      title: "Banquet Catering Services Pepsicola | Guest Experience",
      description: "What makes catering stand out? Understand guest expectations for banquet services and food quality in Kathmandu events."
    }
  },
  {
    title: "How to Choose the Perfect Venue for an Anniversary Celebration in Kathmandu",
    slug: "choose-perfect-venue-anniversary-celebration-kathmandu",
    excerpt: "Anniversaries are milestones. Learn how to select a romantic and elegant venue in Kathmandu to celebrate your journey together.",
    content: "Anniversary venue selection tips...",
    category: "Parties",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
    metadata: {
      title: "Anniversary Venue Kathmandu | Milestone Celebrations",
      description: "Plan a romantic anniversary in Kathmandu. Tips on choosing the right venue for intimate dinners and large social gatherings."
    }
  },
  {
    title: "Wedding Decoration and Seating Tips for Banquet Events in Nepal",
    slug: "wedding-decoration-seating-tips-nepal",
    excerpt: "Maximize your banquet space with these expert decoration and seating arrangement tips tailored for traditional and modern weddings in Nepal.",
    content: "Decor and layout advice for Nepalese weddings...",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    metadata: {
      title: "Wedding Decor & Seating Tips Nepal | Event Design",
      description: "Create a stunning wedding atmosphere. Expert advice on decoration and seating layouts for banquet halls in Kathmandu."
    }
  },
  {
    title: "Complete Event Planning Checklist for Weddings and Parties in Kathmandu",
    slug: "complete-event-planning-checklist-weddings-parties-kathmandu",
    excerpt: "Don't miss a single detail. Download our complete event planning checklist for organizing flawless weddings and parties in Kathmandu.",
    content: "The ultimate checklist for events in Nepal...",
    category: "Planning",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    metadata: {
      title: "Event Planning Checklist Kathmandu | Weddings & Parties",
      description: "Stay organized with our comprehensive event planning checklist for weddings, receptions, and parties in Kathmandu."
    }
  }
];

const seedBlog = async () => {
  try {
    const count = await BlogPost.countDocuments();
    if (count === 0) {
      await BlogPost.insertMany(blogPosts);
      console.log('Blog posts seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding blog posts:', error);
  }
};

module.exports = seedBlog;
