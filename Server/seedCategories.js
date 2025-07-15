require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/category.models"); 

const categories = [
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Books' },
  { name: 'Appliances' }
];

const MONGO_URL = process.env.MONGO_URI;
console.log("Connecting to MongoDB...", MONGO_URL);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("DB Connected");

    await Category.deleteMany({});
    const result = await Category.insertMany(categories);
    console.log("✅ Categories Seeded:", result);

    mongoose.disconnect();
  })
  .catch((err) => {
    console.log("Seeder Error:", err);
    process.exit(1);
  });
