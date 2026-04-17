# 🚀 Portfolio Deployment Guide
## Complete Step-by-Step Instructions for Mahamudul Hassan Siddique

This guide will get your portfolio live online. Follow every step carefully.
**Estimated total time: 30–45 minutes.**

---

## 📁 STEP 0 — Prepare Your Files Folder

Before anything, make sure your portfolio folder contains exactly these files:

```
portfolio/
├── index.html
├── style.css
├── script.js
├── vercel.json
├── portfolio_photo.jpg   ← YOUR PHOTO (rename it exactly this)
├── CV.pdf                ← YOUR CV as a PDF (rename it exactly this)
├── api/
│   └── chat.js
└── INSTRUCTIONS.md       ← this file
```

**Important:** Rename your photo file to exactly `portfolio_photo.jpg` and your CV to exactly `CV.pdf`.

---

## 🔧 STEP 1 — Install Git

Git is a tool that lets you upload your code to GitHub.

1. Go to: **https://git-scm.com/downloads**
2. Download the version for your operating system (Windows/Mac/Linux)
3. Install it (click Next/Continue through all steps, keep default settings)
4. To verify it worked: open a terminal/command prompt and type `git --version`
   - You should see something like `git version 2.x.x`

---

## 🔧 STEP 2 — Install VS Code (Code Editor)

1. Go to: **https://code.visualstudio.com/**
2. Download and install VS Code for your operating system
3. Open it after installation

---

## 🐙 STEP 3 — Create a GitHub Account

1. Go to: **https://github.com**
2. Click **"Sign up"**
3. Choose a username (e.g., `mahamudul-hassan`) — this will appear in your site URL if needed
4. Enter your email, create a password, and verify your account

---

## 📤 STEP 4 — Create a GitHub Repository and Upload Files

1. After logging into GitHub, click the **"+"** icon (top right) → **"New repository"**
2. Name it: `portfolio` (or `my-portfolio`)
3. Set it to **Public**
4. Do NOT check any "Initialize" boxes
5. Click **"Create repository"**

Now you'll see a page with setup instructions. Follow these:

### Open Terminal in VS Code:
1. Open VS Code
2. Go to **File → Open Folder** → select your `portfolio` folder
3. Open the terminal: **Terminal → New Terminal** (from the top menu)

### Type these commands one by one (press Enter after each):

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
git push -u origin main
```

⚠️ Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username!

When prompted, enter your GitHub username and password (or a token — see note below).

> **Note on GitHub password:** GitHub now requires a "Personal Access Token" instead of your password.
> To create one: GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic) → Generate new token → check "repo" scope → Generate → copy the token → use it as your password when prompted.

✅ If successful, your files are now on GitHub!

---

## 🔑 STEP 5 — Get Your HuggingFace API Token (for the Chatbot — FREE)

This powers the AI chatbot on your portfolio using a completely free model.

1. Go to: **https://huggingface.co**
2. Sign up or log in (it's free)
3. Go to **Settings → Access Tokens** (top-right menu → Settings)
4. Click **"New token"**, name it `portfolio-chatbot`, set role to **"Read"**
5. Click **"Generate a token"**
6. **COPY THE TOKEN** — it looks like: `hf_xxxxxxxxxxxxxxxxxxxxxxxx`
7. Save it somewhere safe (Notepad, Notes app) temporarily

---

## 🌐 STEP 6 — Deploy to Vercel (Make It Live!)

1. Go to: **https://vercel.com**
2. Click **"Sign Up"** → choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. You'll see your dashboard. Click **"Add New..."** → **"Project"**
5. Find your `portfolio` repository and click **"Import"**
6. On the configuration page:
   - **Framework Preset:** Leave as "Other" or "Static Site"
   - Everything else: leave as default
7. **Before clicking Deploy**, scroll down to find **"Environment Variables"**
8. Add this variable:
   - **Name:** `HF_API_TOKEN`
   - **Value:** (paste your HuggingFace token here)
   - Click **"Add"**
9. Now click **"Deploy"** 🎉

Wait 1–2 minutes for the build to complete.

✅ Vercel will give you a URL like: `portfolio-xyz.vercel.app`
**Your portfolio is now LIVE!**

---

## 🔄 STEP 7 — How to Update Your Portfolio Later

Whenever you want to make changes (update publications, add a new project, etc.):

1. Edit the files in VS Code
2. Open the terminal in VS Code
3. Run:
```bash
git add .
git commit -m "Update: describe what you changed"
git push
```
4. Vercel will automatically rebuild and update your live site within ~1 minute!

---

## 🎨 STEP 8 — Optional: Custom Domain

If you want a custom URL like `mahamudulhassan.com` instead of `portfolio.vercel.app`:

1. Buy a domain from: Namecheap, GoDaddy, or Google Domains
2. In your Vercel project: **Settings → Domains → Add Domain**
3. Follow Vercel's instructions to connect the domain (they provide step-by-step guidance)

---

## ❓ TROUBLESHOOTING

**"The chatbot says 'something went wrong'"**
→ Check that your `HF_API_TOKEN` environment variable is set correctly in Vercel.
→ In Vercel: Project → Settings → Environment Variables

**"My photo doesn't show"**
→ Make sure the file is named exactly `portfolio_photo.jpg` (lowercase, no spaces)

**"CV download doesn't work"**
→ Make sure your CV PDF is named exactly `CV.pdf` and is in the main portfolio folder (same level as index.html)

**"Git push asks for a password"**
→ Use your Personal Access Token (see Step 4 note above)

**"Page shows an error after deploy"**
→ In Vercel, click on your project → "Deployments" → click the latest deployment → check "Function Logs" and "Build Logs" for error messages

---

## 📬 Need Help?

If you get stuck, take a screenshot of the error and ask Claude (that's me!) to help you fix it. Just paste the error message and I'll guide you through it.

---

*Portfolio built for Mahamudul Hassan Siddique · IPE, BUET · 2025*
