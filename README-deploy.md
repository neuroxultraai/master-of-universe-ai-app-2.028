# Deploy instructions for Ayush Ultra AI (Darshan AI)

## Deploy to Vercel (recommended)
1. Create a GitHub repository and push this project to it.
2. Sign in to https://vercel.com and import the GitHub repository.
3. In the Environment Variables section add:
   - `OPENAI_API_KEY` (your OpenAI API key)
   - `SECRET_KEY` (random string)
   - `MASTER_KEY` (for premium unlock — only for Master of Universe app)
4. Set Build Command: `npm install && npm run build`
5. Set Start Command: `npm start`
6. Click Deploy. Wait until the deployment completes and you will get a live URL.

## Notes
- The AI endpoints are placeholders. When `OPENAI_API_KEY` is set, requests to `/api/chat` will forward to OpenAI.
- Ensure you do not commit `.env` to GitHub. Use Vercel environment variables instead.
