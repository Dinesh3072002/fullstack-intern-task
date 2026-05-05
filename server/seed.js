require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Template = require('./models/Template');
const Favorite = require('./models/Favorite');

const seedData = [
  { name: 'street fashion', category: 'Fashion', thumbnail_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', description: 'High-end fashion magazine layout.' },
  { name: 'Forest', category: 'Theme', thumbnail_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', description: 'Sleek lines and modern aesthetics.' },
  { name: 'Brand Identity', category: 'Fashion  ', thumbnail_url: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=600&q=80', description: 'Professional branding and identity mockup.' },
  { name: 'Street Style', category: 'Fashion', thumbnail_url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', description: 'Streetwear and urban fashion photography.' },
  { name: 'Studio', category: 'Magazine', thumbnail_url: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=600&q=80', description: 'Professional studio magazine cover.' },
  { name: 'BG Theme', category: 'Theme', thumbnail_url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=600&q=80', description: 'Exploring abstract shapes and colors.' },
  { name: 'Light Theme', category: 'Theme', thumbnail_url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80', description: 'Japanese-inspired minimalist interior design.' },
  { name: 'Street Fashion', category: 'Fashion', thumbnail_url: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=600&q=80', description: 'Gritty and authentic street photography layout.' },
  { name: 'BG Theme', category: 'Fashion', thumbnail_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80', description: 'Energetic geometric patterns for modern posters.' },
  { name: 'Nature', category: 'Forest', thumbnail_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80', description: 'The beauty of nature in its simplest form.' },
  { name: 'Tech Interface', category: 'Theme', thumbnail_url: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=600&q=80', description: 'Sleek dark-mode interface for technical apps.' },
  { name: 'E-commerce UI', category: 'E-commerce', thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80', description: 'Modern e-commerce product display interface.' },
  { name: 'Office Workspace', category: 'Blog', thumbnail_url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80', description: 'A look into inspiring creative working environments.' },
  { name: 'Retro  theme', category: 'Poster', thumbnail_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80', description: '80s-inspired synthwave aesthetic poster.' },
  { name: 'Professional', category: 'Poster', thumbnail_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80', description: 'Clean and readable professional resume template.' },
  { name: 'Digital Art', category: 'Theme', thumbnail_url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=600&q=80', description: 'Showcase your digital illustrations and designs.' }
];

const runSeed = async () => {
  await connectDB();
  try {
    console.log('Clearing existing data...');
    await Template.deleteMany();
    await Favorite.deleteMany();
    console.log('Inserting fresh templates...');
    await Template.insertMany(seedData);
    console.log('Templates seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
};
runSeed();
