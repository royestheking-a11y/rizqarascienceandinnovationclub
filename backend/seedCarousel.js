const mongoose = require('mongoose');
require('dotenv').config();
const CarouselSlide = require('./backend/models/CarouselSlide');

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1766297248160-87aca6fa59ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '🏆 1st Prize Winners — Science & Technology Fair 2026',
    heading1: 'Building Future',
    heading2: 'Innovators',
    accent: 'Through Science & Technology',
    sub: 'A global student innovation community focused on real-world projects, digital skills, and research-driven learning.',
    cta1Label: 'Join RSIC — Free',
    cta1Href: '/join',
    cta2Label: 'Explore Projects',
    cta2Href: '/projects',
    order: 0,
    active: true
  },
  {
    image: 'https://images.unsplash.com/photo-1636979648933-6d06b1ce9ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '💻 World-Class Programming & AI Programs',
    heading1: 'Master Cutting-Edge',
    heading2: 'Technology & AI',
    accent: 'From Code to Innovation',
    sub: 'From Python to Machine Learning — learn through real projects, expert mentors, and industry-grade curriculum designed for tomorrow\'s leaders.',
    cta1Label: 'Start Learning',
    cta1Href: '/programs',
    cta2Label: 'View Programs',
    cta2Href: '/programs',
    order: 1,
    active: true
  },
  {
    image: 'https://images.unsplash.com/photo-1768796371633-ba921e535c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '🤖 Robotics & IoT Excellence Center',
    heading1: 'Build Intelligent',
    heading2: 'Robots & Devices',
    accent: 'Powering the Physical World',
    sub: 'Explore the frontier of robotics, embedded systems, and IoT — build smart devices that solve real problems for real communities.',
    cta1Label: 'Join Robotics Lab',
    cta1Href: '/programs',
    cta2Label: 'See Projects',
    cta2Href: '/projects',
    order: 2,
    active: true
  },
  {
    image: 'https://images.unsplash.com/photo-1766297248122-5957c51b1f7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '🌍 500+ Members Across the Globe',
    heading1: 'Join a Worldwide',
    heading2: 'Innovation Movement',
    accent: 'Students. Builders. Leaders.',
    sub: 'Connect with brilliant students, researchers, and innovators from across Bangladesh and around the world. Your journey starts here.',
    cta1Label: 'Join Now — Free',
    cta1Href: '/join',
    cta2Label: 'Meet the Team',
    cta2Href: '/team',
    order: 3,
    active: true
  },
  {
    image: 'https://images.unsplash.com/photo-1767561070418-cbb62b952a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    badge: '🎖️ National Award-Winning Excellence',
    heading1: 'Award-Winning',
    heading2: 'Innovation Hub',
    accent: 'Recognition That Matters',
    sub: 'Our projects have won national recognition and positively impacted thousands of students across Bangladesh and beyond.',
    cta1Label: 'Our Achievements',
    cta1Href: '/achievements',
    cta2Label: 'View Projects',
    cta2Href: '/projects',
    order: 4,
    active: true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await CarouselSlide.deleteMany({});
    console.log('Cleared existing slides');
    
    await CarouselSlide.insertMany(HERO_SLIDES);
    console.log('Seeded initial slides');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
