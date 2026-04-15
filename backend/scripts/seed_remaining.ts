import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Event = require('../models/Event.js');
const Blog = require('../models/Blog.js');
const Gallery = require('../models/Gallery.js');

import { EVENTS, BLOG_POSTS, GALLERY_ITEMS } from '../../src/app/data/mockData.ts';

const uploadMedia = async (mediaPath: string | undefined): Promise<string | null> => {
  if (!mediaPath) return null;
  try {
    let uploadPath = mediaPath;
    if (mediaPath.startsWith('/')) uploadPath = path.join(__dirname, '../../public', mediaPath);
    console.log(`Uploading: ${uploadPath}`);
    const res = await cloudinary.uploader.upload(uploadPath, { folder: 'rizqara' });
    return res.secure_url;
  } catch (error: any) {
    console.error(`Upload fail ${mediaPath}:`, error.message);
    return mediaPath;
  }
};

const runSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('DB Connected for secondary seeder...');

    await Event.deleteMany({});
    await Blog.deleteMany({});
    await Gallery.deleteMany({});
    console.log('Cleared targeted documents...');

    for (const ev of EVENTS) {
      console.log(`Migrating event: ${ev.title}`);
      const imageUrl = await uploadMedia(ev.image);
      await Event.create({
        customId: ev.id,
        ...ev,
        id: undefined,
        image: imageUrl
      });
    }

    for (const post of BLOG_POSTS) {
      console.log(`Migrating blog: ${post.title}`);
      const imageUrl = await uploadMedia(post.image);
      await Blog.create({
        customId: post.id,
        ...post,
        id: undefined,
        image: imageUrl
      });
    }

    for (const item of GALLERY_ITEMS) {
      console.log(`Migrating gallery item: ${item.title}`);
      const imageUrl = await uploadMedia(item.image);
      await Gallery.create({
        customId: String(item.id),
        ...item,
        id: undefined,
        image: imageUrl
      });
    }

    console.log('Secondary Seeding Success!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runSeeder();
