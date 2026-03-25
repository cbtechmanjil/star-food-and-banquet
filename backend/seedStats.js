const Stat = require('./models/Stat');

const seedStats = async () => {
  try {
    const count = await Stat.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding Statistics Counters...');
      const defaultStats = [
        { value: 15, label: "years of experience", suffix: "" },
        { value: 350, label: "full-time employees", suffix: "" },
        { value: 25, label: "servings / day", suffix: "" },
        { value: 720, label: "events / year", suffix: "" },
      ];
      await Stat.insertMany(defaultStats);
      console.log('✅ Stats seeded');
    }
  } catch (err) {
    console.error('❌ Failed to seed Stats:', err);
  }
};

module.exports = seedStats;
