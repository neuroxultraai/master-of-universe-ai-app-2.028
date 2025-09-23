
import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

async function callOpenAI(system, userPrompt) {
  if(!OPENAI_API_KEY) return null;
  const body = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt }
    ],
    max_tokens: 400,
    temperature: 0.2
  };
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type':'application/json' },
    body: JSON.stringify(body)
  });
  const j = await r.json();
  return j;
}

router.post('/', async (req,res) => {
  try {
    const payload = req.body || { };
    // attempt OpenAI
    const system = "You are a helpful assistant for the feature.";
    const userPrompt = JSON.stringify(payload).slice(0,1000);
    const ai = await callOpenAI(system, userPrompt);
    if(ai && ai.choices && ai.choices[0] && ai.choices[0].message) {
      return res.json({ source: 'openai', reply: ai.choices[0].message.content });
    } else {
      // fallback mock response
      return res.json({ source: 'mock', reply: 'This is a placeholder response. Replace with your logic.' });
    }
  } catch(e) {
    console.error('route error', e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
