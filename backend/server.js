require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Project = require('./models/Project');
const Program = require('./models/Program');
const Achievement = require('./models/Achievement');
const TeamMember = require('./models/TeamMember');
const Submission = require('./models/Submission');
const Event = require('./models/Event');
const Blog = require('./models/Blog');
const Gallery = require('./models/Gallery');
const Member = require('./models/Member');
const Certificate = require('./models/Certificate');

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
                     origin.endsWith('.vercel.app') || 
                     origin.includes('rizqara');

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error('Images only! (jpeg, jpg, png, webp, gif)'));
  }
});

// Connect DB
connectDB();

// Health Check
app.get('/', (req, res) => res.send('API is running...'));

// GET Endpoints (replacing mock data arrays)
app.get('/api/projects', async (req, res) => {
  try {
    const data = await Project.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/programs', async (req, res) => {
  try {
    const data = await Program.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/achievements', async (req, res) => {
  try {
    const data = await Achievement.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/team', async (req, res) => {
  try {
    const data = await TeamMember.find({}).sort({ customId: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const data = await Event.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/blog', async (req, res) => {
  try {
    const data = await Blog.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const data = await Gallery.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/members', async (req, res) => {
  try {
    const data = await Member.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/submissions', async (req, res) => {
  try {
    const data = await Submission.find({}).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/certificates/v/:slug', async (req, res) => {
  try {
    const data = await Certificate.findOne({ slug: req.params.slug });
    if (!data) return res.status(404).json({ error: 'Certificate not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  // Use protocol and host from request to handle both local and production URLs
  const protocol = req.protocol;
  const host = req.get('host');
  const url = `${protocol}://${host}/uploads/${req.file.filename}`;
  
  res.json({ url, filename: req.file.filename });
});

const getModel = (model) => {
  const models = { 
    projects: Project, 
    programs: Program, 
    achievements: Achievement, 
    team: TeamMember, 
    submissions: Submission, 
    events: Event, 
    blog: Blog, 
    gallery: Gallery, 
    members: Member,
    certificates: Certificate
  };
  return models[model];
};

app.post('/api/:model', async (req, res) => {
  const Model = getModel(req.params.model);
  if (!Model) return res.status(404).send('Model not found');
  if (req.params.model === 'submissions') return req.next(); // Skip to custom submission handler if needed

  try {
    const newDoc = new Model(req.body);
    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Custom Submission POST handler (already present but refactored to specific path logic)
app.post('/api/submissions/:type', async (req, res) => {
  try {
    const { type } = req.params;
    if(!['donation', 'contact', 'application'].includes(type)) return res.status(400).json({ error: 'Invalid submission type' });
    const submission = new Submission({ type, data: req.body });
    await submission.save();
    res.status(201).json({ success: true, submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/:model/:id', async (req, res) => {
  const Model = getModel(req.params.model);
  if (!Model) return res.status(404).send('Model not found');
  try {
    const query = mongoose.Types.ObjectId.isValid(req.params.id) ? { _id: req.params.id } : { customId: req.params.id };
    const updated = await Model.findOneAndUpdate(query, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/:model/:id', async (req, res) => {
  const Model = getModel(req.params.model);
  if (!Model) return res.status(404).send('Model not found');
  try {
    const query = mongoose.Types.ObjectId.isValid(req.params.id) ? { _id: req.params.id } : { customId: req.params.id };
    await Model.findOneAndDelete(query);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
