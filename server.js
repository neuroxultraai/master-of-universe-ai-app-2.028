// Ayush Ultra AI (Darshan AI) - minimal deploy-ready server
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const multer = require('multer');
const upload = multer();
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: process.env.SECRET_KEY || 'devsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24*60*60*1000 }
}));

// Mock user store (in-memory). For production, use a database.
const users = {};

// Simple register/login routes
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'email & password required' });
  if(users[email]) return res.status(400).json({ error: 'user exists' });
  users[email] = { password };
  req.session.user = { email };
  return res.json({ ok: true, email });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'email & password required' });
  const u = users[email];
  if(!u || u.password !== password) return res.status(401).json({ error: 'invalid credentials' });
  req.session.user = { email };
  return res.json({ ok: true, email });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

// Protected route example
function ensureAuth(req, res, next) {
  if(req.session && req.session.user) return next();
  return res.status(401).json({ error: 'not authenticated' });
}

// Premium check middleware
function checkPremium(req, res, next) {
  const isPremium = req.session && req.session.isPremium;
  return next();
}

// Basic AI chat endpoint (placeholder forwarding to OpenAI if key present)
app.post('/api/chat', ensureAuth, async (req, res) => {
  const { message } = req.body;
  if(!message) return res.status(400).json({ error: 'message required' });
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if(!OPENAI_KEY) {
    // placeholder response
    return res.json({ reply: `AI placeholder reply to: ${message}` });
  }
  try {
    // minimal OpenAI call (text completion) - using fetch to v1/completions or chat completions depending on key
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
        max_tokens: 300
      })
    });
    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content || JSON.stringify(data);
    return res.json({ reply });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'AI error', detail: String(e) });
  }
});

// Unlock premium (Master of Universe) - only if MASTER_KEY matches
app.post('/api/unlock', ensureAuth, (req, res) => {
  const { key } = req.body;
  if(!key) return res.status(400).json({ error: 'key required' });
  if(process.env.MASTER_KEY && key === process.env.MASTER_KEY) {
    req.session.isPremium = true;
    return res.json({ ok: true, premium: true });
  }
  return res.status(403).json({ error: 'invalid key' });
});

// Image upload placeholder
app.post('/api/image', ensureAuth, upload.single('file'), (req, res) => {
  // For demo: just echo filename
  return res.json({ ok: true, filename: req.file ? req.file.originalname : 'no-file' });
});

// Voice upload placeholder
app.post('/api/voice', ensureAuth, upload.single('voice'), (req, res) => {
  return res.json({ ok: true, filename: req.file ? req.file.originalname : 'no-voice' });
});

// Basic health check
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, time: Date.now() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
