const BanquetMenu = require('./models/BanquetMenu');

const seedBanquetMenu = async () => {
  try {
    const existingCount = await BanquetMenu.countDocuments();
    if (existingCount > 0) return;

    const initialData = [
      {
        tab: "Gold",
        categories: [
          {
            name: "Veg Snacks",
            subtitle: "Any 3",
            icon: "Salad",
            items: [
              "Peanut / Bhatmas Sadheko", "Wedge Potato", "Tofu Chilli", "Veg Tempura", "Veg Ball With Sauce",
              "Veg Mo:Mo / Wanton", "Spring Rolls", "Veg / Onion Pakaoda", "Finger Chips / Sliced Crispy",
              "Mushroom Choila / Chilli", "Sesame Potato"
            ]
          },
          {
            name: "Premium Veg Snacks",
            subtitle: "Any 2",
            icon: "Sparkles",
            items: ["Crispy Mushroom", "Cheese Ball", "Paneer Pakaoda", "Paneer Chilli"]
          },
          {
            name: "Non-Veg Snacks",
            subtitle: "Any 3",
            icon: "Flame",
            items: [
              "Chicken Chilli With Bone", "Chicken Ball", "Chicken BBQ / Sekuwa", "Chicken Drumstick",
              "Chicken Nuggets", "Chicken Choila", "Chicken Mo:Mo", "Chicken Tikka", "Chicken Singapore",
              "Fish Tempura", "Fish Finger", "Small Fish"
            ]
          },
          {
            name: "Main Course",
            subtitle: "Choose one dish from each category",
            icon: "ChefHat",
            items: [
              "Rice: Plain Rice / Peas Pulao / Masala Pulao / Jeera Rice / Fried Rice",
              "Naan Roti: Plain / Butter / Baby / Paratha / Roti or Noodles",
              "Dal: Mixed / Makhani / Yellow / White Beans",
              "Seasonal Veg: Mixed Veg Dry / Aalu Parbal / Mixed Veg Chinese / Katahar Kabaab / Aalu Kauli",
              "Paneer: Butter Masala / Mutter / Shahi / Palak",
              "Saag: Pakuchey With Mushroom / Rayo / Palung / Chamsur",
              "Chicken / Fish: Chicken Fry / Chicken Tawa / Chicken Curry / Fish Fry / Fish Curry",
              "Mutton: Mutton Curry (Nepali Style) / Pakku"
            ]
          },
          {
            name: "Salad",
            subtitle: "Any 3",
            icon: "Leaf",
            items: ["Green Salad", "Thai Cucumber Salad", "Waldorf Salad", "Russian", "Beetroot"]
          },
          {
            name: "Pickle",
            subtitle: "Any 2",
            icon: "Cherry",
            items: ["Mixed Achar", "Tomato", "Karela", "Gundruk", "Lapsi", "ReadyMade Achar", "Aalu"]
          },
          {
            name: "Dessert",
            subtitle: "Any 2",
            icon: "IceCreamCone",
            items: ["Dahi", "Jalebi", "Rasbari", "Lalmohan", "Gajar ko Haluwa", "Moong ko Haluwa"]
          },
          {
            name: "Soup & Beverages",
            subtitle: "Any 1",
            icon: "Coffee",
            items: ["Mushroom", "Veg", "Hot and Sour", "Tea", "Coffee"]
          },
          {
            name: "Additional Services",
            subtitle: "Included",
            icon: "Music",
            items: [
              "DJ With Sound System", "Flower Decoration", "Mandap Decoration", "Whole Mutton BBQ",
              "Mutton Sekuwa / Tawa", "Bandel Sekuwa", "Pani Puri", "Paan Masala", "Ice Cream", "Cold Drinks"
            ]
          }
        ]
      },
      {
        tab: "Diamond",
        categories: [
          {
            name: "Veg Snacks",
            subtitle: "Any 4",
            icon: "Salad",
            items: [
              "Peanut / Bhatmas Sadheko", "Wedge Potato", "Tofu Chilli", "Veg Tempura", "Veg Ball With Sauce",
              "Veg Mo:Mo / Wanton", "Spring Rolls", "Veg / Onion Pakaoda", "Finger Chips / Sliced Crispy",
              "Mushroom Choila / Chilli / Crispy", "Sesame Potato", "Aalu Sadheko", "Sweet Corn"
            ]
          },
          {
            name: "Premium Veg Snacks",
            subtitle: "Any 2",
            icon: "Sparkles",
            items: ["Hara Bara Kabab", "Cheese Ball / Pakaoda / Croquettes", "Paneer Pakaoda / Chilli / Tikka"]
          },
          {
            name: "Non-Veg Snacks",
            subtitle: "Any 5",
            icon: "Flame",
            items: [
              "Chicken Chilli With Bone", "Chicken Ball", "Chicken BBQ / Sekuwa", "Chicken Drumstick",
              "Chicken Nuggets", "Chicken Choila / Sadheko", "Chicken Mo:Mo / Sausage", "Chicken Tikka",
              "Buff Chilli / Choila", "Chicken Singapore / Satey", "Fish Tempura", "Fish Finger",
              "Small Fish / Dragon Fish", "Pork Chilli / Roasted Pork"
            ]
          },
          {
            name: "Main Course",
            subtitle: "Choose one dish from each category",
            icon: "ChefHat",
            items: [
              "Rice: Plain Rice / Peas Pulao / Masala Pulao / Jeera Rice / Biryani / Brown Rice",
              "Naan Roti: Plain / Butter / Baby / Paratha / Roti or Noodles",
              "Dal: Mixed / Makhani / Yellow / White Beans / Mustang Dal",
              "Seasonal Veg: Mixed Veg Dry / Aalu Parbal / Mixed Veg Chinese / Katahar Kabaab / Aalu Kauli",
              "Paneer: Butter Masala / Mutter / Shahi / Palak",
              "Saag: Pakuchey With Black Mushroom / Rayo / Palung / Chamsur",
              "Chicken / Fish: Chicken Fry / Chicken Tawa / Chicken Curry / Fish Fry / Fish Curry",
              "Mutton: Mutton Curry (Nepali Style) / Mutton Do-Pyaza"
            ]
          },
          {
            name: "Salad",
            subtitle: "Any 3",
            icon: "Leaf",
            items: ["Green Salad", "Thai Cucumber Salad", "Waldorf Salad", "Russian", "Beetroot"]
          },
          {
            name: "Pickle",
            subtitle: "Any 2",
            icon: "Cherry",
            items: ["Mixed Achar", "Tomato", "Karela", "Gundruk", "Lapsi", "ReadyMade Achar", "Aalu"]
          },
          {
            name: "Dessert",
            subtitle: "Any 2",
            icon: "IceCreamCone",
            items: ["Dahi", "Jalebi", "Rasbari", "Lalmohan", "Gajar ko Haluwa", "Moong ko Haluwa"]
          },
          {
            name: "Soup & Beverages",
            subtitle: "Any 1",
            icon: "Coffee",
            items: ["Mushroom", "Veg", "Hot and Sour", "Tea", "Coffee"]
          },
          {
            name: "Additional Services",
            subtitle: "Included",
            icon: "Music",
            items: [
              "DJ With Sound System", "Flower Decoration", "Mandap Decoration", "Whole Mutton BBQ",
              "Mutton Sekuwa / Tawa", "Bandel Sekuwa", "Pani Puri", "Paan Masala", "Ice Cream", "Cold Drinks"
            ]
          }
        ]
      }
    ];

    await BanquetMenu.insertMany(initialData);
    console.log('Banquet Menus seeded successfully');
  } catch (err) {
    console.error('Error seeding banquet menus:', err);
  }
};

module.exports = seedBanquetMenu;
