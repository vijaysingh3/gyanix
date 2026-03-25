# सर्वम् AI — Bharat's AI Platform 🪔

A beautiful Next.js web app using Sarvam AI APIs with Indian colorful theme.

## Features
- 💬 **Chat** — Sarvam 105B (Free LLM)
- 🔊 **Text to Speech** — Bulbul v2 (10 Indian languages)
- 🎤 **Speech to Text** — Saarika v2
- 🌐 **Translate** — Mayura v1 (10 languages)

## 🚀 Deploy on Vercel

### Step 1: GitHub pe upload karo
```bash
git init
git add .
git commit -m "Initial commit - Sarvam AI App"
git remote add origin https://github.com/YOUR_USERNAME/sarvam-ai-app.git
git push -u origin main
```

### Step 2: Vercel pe deploy karo
1. [vercel.com](https://vercel.com) pe jao
2. "New Project" click karo
3. GitHub repo select karo
4. **Environment Variables** add karo:
   - `SARVAM_API_KEY` = your_api_key_here
5. Deploy! ✅

## Local Development
```bash
npm install
cp .env.local.example .env.local
# .env.local mein apni API key daalo
npm run dev
```

Open: http://localhost:3000
