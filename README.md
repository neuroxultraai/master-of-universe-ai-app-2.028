# Ayush Ultra AI (Darshan AI)

This is a deploy-ready skeleton for **Ayush Ultra AI (Darshan AI)** built to be deployable to platforms like Vercel or Render.
It contains:
- Node.js + Express backend (server.js)
- Static frontend (public/)
- Mock login (email/password) and session management (simple)
- AI endpoint placeholders that use `OPENAI_API_KEY` from environment variables
- `.env.example` for required environment variables
- `README-deploy.md` with deployment steps and environment variables instructions

> IMPORTANT: Replace the placeholder `OPENAI_API_KEY` in the environment with your real OpenAI API key.
> The AI endpoints are placeholders that call OpenAI APIs if the key is provided.

## Quick local run (development)
1. Install dependencies:
```bash
npm install
```
2. Copy environment example:
```bash
cp .env.example .env
# edit .env to add values (OPENAI_API_KEY, SECRET_KEY, MASTER_KEY for premium)
```
3. Start server:
```bash
npm start
```
4. Open `http://localhost:3000` in your browser.

## Vercel deploy notes
- For best compatibility, create a Vercel project and connect your GitHub repository (push this project).
- Add environment variables in Vercel dashboard:
  - `OPENAI_API_KEY` - your OpenAI API key
  - `SECRET_KEY` - random secret for session signing
  - `MASTER_KEY` - key string to unlock premium features (Master of Universe app)
- Build & Start commands:
  - Build: `npm install && npm run build` (build is a no-op in this skeleton)
  - Start: `npm start`

See `README-deploy.md` for step-by-step Vercel instructions.
