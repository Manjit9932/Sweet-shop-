require('dotenv').config();
const mongoose = require('mongoose');
const Sweet = require('../src/models/Sweet');
const connectDB = require('../src/config/database');

const sampleSweets = [
  {
    name: 'Dairy Milk Chocolate',
    category: 'chocolate',
    price: 50,
    quantity: 100,
    description: 'Delicious milk chocolate bar from Cadbury'
  },
  {
    name: 'KitKat Chunky',
    category: 'chocolate',
    price: 40,
    quantity: 150,
    description: 'Crispy wafer covered in smooth chocolate'
  },
  {
    name: 'Mango Bite',
    category: 'candy',
    price: 5,
    quantity: 200,
    description: 'Tangy and sweet mango flavored candy'
  },
  {
    name: 'Eclairs',
    category: 'candy',
    price: 10,
    quantity: 180,
    description: 'Rich chocolate and caramel candy'
  },
  {
    name: 'Jelly Belly Gummies',
    category: 'gummy',
    price: 120,
    quantity: 80,
    description: 'Assorted fruit-flavored gummy bears'
  },
  {
    name: 'Alpenliebe Lollipop',
    category: 'lollipop',
    price: 15,
    quantity: 250,
    description: 'Creamy caramel lollipop'
  },
  {
    name: 'Pulse Candy',
    category: 'hard-candy',
    price: 2,
    quantity: 300,
    description: 'Tangy kachi kairi hard candy'
  },
  {
    name: '5 Star',
    category: 'chocolate',
    price: 20,
    quantity: 120,
    description: 'Chocolate with caramel and nougat'
  },
  {
    name: 'Perk',
    category: 'chocolate',
    price: 10,
    quantity: 200,
    description: 'Wafer chocolate bar'
  },
  {
    name: 'Melody',
    category: 'candy',
    price: 5,
    quantity: 220,
    description: 'Chocolaty and caramelly candy'
  }
];

const seedSweets = async () => {
  try {
    await connectDB();
    
    // Clear existing sweets
    await Sweet.deleteMany({});
    console.log('🗑️  Cleared existing sweets');
    
    // Insert sample sweets
    await Sweet.insertMany(sampleSweets);
    console.log('✅ Sample sweets added successfully!');
    console.log(`📦 Total sweets: ${sampleSweets.length}`);
    
    console.log('\n🍬 Sample Sweets with Indian Prices:');
    sampleSweets.forEach(sweet => {
      console.log(`- ${sweet.name}: ₹${sweet.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedSweets();
