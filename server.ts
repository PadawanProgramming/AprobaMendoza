import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('database.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS guides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT,
    url TEXT NOT NULL,
    fileName TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS workshops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    coverUrl TEXT,
    videoUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS syllabus_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workshopId INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY(workshopId) REFERENCES workshops(id) ON DELETE CASCADE
  );
`);

const app = express();
app.use(express.json());

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Admin login check (simple for this example)
app.post('/api/login', (req, res) => {
  const { user, pass } = req.body;
  if (user === 'padawan' && pass === '24/1/2007') {
    res.json({ success: true, token: 'admin-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Guides endpoints
app.get('/api/guides', (req, res) => {
  const guides = db.prepare('SELECT * FROM guides ORDER BY createdAt DESC').all();
  res.json(guides);
});

app.post('/api/guides', upload.single('file'), (req: any, res) => {
  const { title, subject, topic } = req.body;
  const fileName = req.file?.filename;
  const url = fileName ? `/uploads/${fileName}` : req.body.url;

  const info = db.prepare('INSERT INTO guides (title, subject, topic, url, fileName) VALUES (?, ?, ?, ?, ?)')
    .run(title, subject, topic, url, fileName);
  
  res.json({ id: info.lastInsertRowid, title, subject, topic, url });
});

app.delete('/api/guides/:id', (req, res) => {
  db.prepare('DELETE FROM guides WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Workshops endpoints
app.get('/api/workshops', (req, res) => {
  const workshops = db.prepare('SELECT * FROM workshops ORDER BY createdAt DESC').all();
  const workshopsWithSyllabus = workshops.map((w: any) => {
    const syllabus = db.prepare('SELECT * FROM syllabus_items WHERE workshopId = ?').all(w.id);
    return { ...w, syllabus };
  });
  res.json(workshopsWithSyllabus);
});

app.get('/api/workshops/:id', (req, res) => {
  const workshop = db.prepare('SELECT * FROM workshops WHERE id = ?').get(req.params.id);
  if (!workshop) return res.status(404).json({ message: 'Not found' });
  
  const syllabus = db.prepare('SELECT * FROM syllabus_items WHERE workshopId = ?').all(req.params.id);
  res.json({ ...workshop, syllabus });
});

app.post('/api/workshops', upload.single('cover'), (req: any, res) => {
  const { title, description, videoUrl, syllabus } = req.body;
  const coverUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
  const insertWorkshop = db.prepare('INSERT INTO workshops (title, description, coverUrl, videoUrl) VALUES (?, ?, ?, ?)');
  const insertSyllabus = db.prepare('INSERT INTO syllabus_items (workshopId, title, content) VALUES (?, ?, ?)');

  const transaction = db.transaction((data) => {
    const info = insertWorkshop.run(data.title, data.description, data.coverUrl, data.videoUrl);
    const workshopId = info.lastInsertRowid;
    
    if (data.syllabus) {
      const syllabusArr = JSON.parse(data.syllabus);
      for (const item of syllabusArr) {
        insertSyllabus.run(workshopId, item.title, item.content);
      }
    }
    return workshopId;
  });

  const workshopId = transaction({ title, description, coverUrl, videoUrl, syllabus });
  res.json({ id: workshopId, success: true });
});

app.delete('/api/workshops/:id', (req, res) => {
  db.prepare('DELETE FROM workshops WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

async function startServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
