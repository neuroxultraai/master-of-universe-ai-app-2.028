
Master of Universe AI — Final Starter Pack
=========================================

This package is a deployable starter for the "Master of Universe AI" app.
It includes a frontend (static) and a Node.js backend with routes for many features.
Each route uses OpenAI if OPENAI_API_KEY is present in server/.env, otherwise returns safe mock responses.

Structure
---------
master-universe-ai/
  frontend/
    index.html
    assets/style.css
    assets/app.js
  backend/
    server.js
    routes/tutor.js
    routes/doctor.js
    routes/coding.js
    routes/mentor.js
    routes/designer.js
    routes/business.js
    routes/social.js
    package.json
    .env.example
  features/ (notes & placeholders)
  LICENSE (MIT)

Quick start (local)
-------------------
1. Extract the ZIP.
2. Start backend:
   cd backend
   npm install
   cp .env.example .env   # edit .env and set OPENAI_API_KEY if you have one
   node server.js
3. Serve frontend (in a separate terminal):
   npx http-server ../frontend -p 8080   # from backend folder
   Open http://localhost:8080

Notes & Safety
----------------
- Do NOT commit your real API keys into public repos.
- The medical endpoints are informational only — show disclaimer and suggest consulting professionals.
- This package is a starter: replace placeholders, models and UIs as needed.
