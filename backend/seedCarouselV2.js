const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const CarouselSlide = require('./models/CarouselSlide');

const BRAND_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1766297248160-87aca6fa59ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '🚀 THE HUB OF INNOVATION',
    heading: 'Where Ideas Turn Into Reality',
    description: 'Join RSIC to collaborate on experimental projects, master new technologies, and build solutions that matter for the future of Bangladesh.',
    cta1Label: 'Join RSIC — Free',
    cta1Href: '/join',
    cta2Label: 'Explore Projects',
    cta2Href: '/projects',
    order: 0,
    active: true
  },
  {
    image: 'https://images.unsplash.com/photo-1636979648933-6d06b1ce9ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '💡 FUTURE-READY SKILLS',
    heading: 'Empowering Next-Gen Tech Leaders',
    description: 'From AI research to hardware engineering, we provide the tools and mentorship to bridge the gap between classroom and global careers.',
    cta1Label: 'Start Learning',
    cta1Href: '/programs',
    cta2Label: 'Learn More',
    cta2Href: '/about',
    order: 1,
    active: true
  },
  {
    image: 'https://images.unsplash.com/photo-1768796371633-ba921e535c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '🌍 GLOBAL IMPACT',
    heading: 'Innovation That Solves Problems',
    description: 'Our award-winning projects are designed to impact lives in Bangladesh and beyond. Be part of a community that builds for a better world.',
    cta1Label: 'Our Achievements',
    cta1Href: '/achievements',
    cta2Label: 'View Impact',
    cta2Href: '/gallery',
    order: 2,
    active: true
  }
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not found');
    
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    await CarouselSlide.deleteMany({});
    console.log('Cleared existing slides');
    
    await CarouselSlide.insertMany(BRAND_SLIDES);
    console.log('Seeded 3 new premium brand slides');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
