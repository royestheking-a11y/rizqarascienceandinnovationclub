const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const UPDATES = [
  { id: 'admission-bondu', link: 'https://admissionbondu.me' },
  { id: 'elevate-cv', link: 'https://elevatecvs.vercel.app/' },
  { id: 'pengu', link: 'https://www.pengui.tech/' },
  { id: 'voca-messenger', link: 'https://vocamessenger.vercel.app/' },
  { id: 'jeevita', link: 'https://jeevita.vercel.app/' }
];

async function run() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not found');
    
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    for (const item of UPDATES) {
      const result = await Project.findOneAndUpdate(
        { $or: [{ id: item.id }, { customId: item.id }] },
        { link: item.link },
        { new: true }
      );
      if (result) {
        console.log(`Updated ${item.id} -> ${item.link}`);
      } else {
        console.log(`Could not find project with ID: ${item.id}`);
      }
    }

    console.log('Update Complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
