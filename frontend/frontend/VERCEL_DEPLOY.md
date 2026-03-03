# Deploy to Vercel - Quick Guide

## Prerequisites
1. Push your code to GitHub
2. Have a Render backend URL ready (after deploying backend)

## Steps to Deploy Frontend to Vercel

### Option 1: Deploy from Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: **Vite**
   - Build Command: `npm run build` or `vite build`
   - Output Directory: `dist`
5. Click "Deploy"

### Option 2: Deploy from CLI

```
bash
cd frontend/frontend
npm i -g vercel
vercel
```

## Important: Set Environment Variable

After deploying your backend to Render, you need to add the environment variable in Vercel:

1. Go to your Vercel project → Settings → Environment Variables
2. Add new variable:
   - Name: `VITE_API_URL`
   - Value: Your Render backend URL (e.g., `https://your-backend.onrender.com/api`)
3. Redeploy to apply changes

## Development (Local)

Create a `.env` file in `frontend/frontend/`:
```
env
VITE_API_URL=http://localhost:8000/api
```

Then run:
```
bash
npm run dev
```

## Current Configuration

- **vercel.json**: Already configured for SPA routing
- **api.js**: Uses `VITE_API_URL` environment variable (falls back to localhost)
- **Backend URL**: You need to set this after deploying to Render
