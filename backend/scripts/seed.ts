import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load config
dotenv.config({ path: path.join(__dirname, '../.env') });
import connectDB from '../config/db.js';

// Load Models
import Project from '../models/Project.js';
import Program from '../models/Program.js';
import Achievement from '../models/Achievement.js';
import TeamMember from '../models/TeamMember.js';
import Event from '../models/Event.js';
import Blog from '../models/Blog.js';
import Gallery from '../models/Gallery.js';

// Load Mock Data
import { config } from 'dotenv'; // dummy
// Since tsx allows importing TS files directly:
import { 
  PROJECTS, PROGRAMS, ACHIEVEMENTS, TEAM, EVENTS, BLOG_POSTS, GALLERY_ITEMS 
} from '../../src/app/data/mockData.js';

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing old data...');
    await Promise.all([
      Project.deleteMany({}),
      Program.deleteMany({}),
      Achievement.deleteMany({}),
      TeamMember.deleteMany({}),
      Event.deleteMany({}),
      Blog.deleteMany({}),
      Gallery.deleteMany({})
    ]);

    console.log('Seeding new data...');
    
    // Seed Projects
    const projectsToInsert = PROJECTS.map(p => ({ ...p, customId: String(p.id) }));
    await Project.insertMany(projectsToInsert);
    console.log(`Seeded ${projectsToInsert.length} projects`);

    // Seed Programs
    const programsToInsert = PROGRAMS.map(p => ({ 
      ...p, 
      customId: String(p.id),
      courses: p.courses ? p.courses.map(c => ({ ...c, id: String(c.id) })) : []
    }));
    await Program.insertMany(programsToInsert);
    console.log(`Seeded ${programsToInsert.length} programs`);

    // Seed Achievements
    const achievementsToInsert = ACHIEVEMENTS.map(a => ({ ...a, customId: String(a.id) }));
    await Achievement.insertMany(achievementsToInsert);
    console.log(`Seeded ${achievementsToInsert.length} achievements`);

    // Seed Team
    const teamToInsert = TEAM.map(t => ({ ...t, customId: String(t.id) }));
    await TeamMember.insertMany(teamToInsert);
    console.log(`Seeded ${teamToInsert.length} team members`);

    // Seed Events
    const eventsToInsert = EVENTS.map(e => ({ ...e, customId: String(e.id) }));
    await Event.insertMany(eventsToInsert);
    console.log(`Seeded ${eventsToInsert.length} events`);

    // Seed Blog
    const blogsToInsert = BLOG_POSTS.map(b => ({ ...b, customId: String(b.id) }));
    await Blog.insertMany(blogsToInsert);
    console.log(`Seeded ${blogsToInsert.length} blog posts`);

    // Seed Gallery
    const galleryToInsert = GALLERY_ITEMS.map(g => ({ ...g, customId: String(g.id) }));
    await Gallery.insertMany(galleryToInsert);
    console.log(`Seeded ${galleryToInsert.length} gallery items`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
