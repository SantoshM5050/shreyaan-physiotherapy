# Shreyaan Physiotherapy Center

Production-ready Next.js 15 App Router site for SHREYAAN PHYSIOTHERAPY CENTER. It is configured for static deployment to Cloudflare Pages.

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare, choose **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository**.
3. Select **Next.js (Static HTML Export)**. Use `npx next build` as the build command and `out` as the build directory.
4. Optional but recommended: add `NEXT_PUBLIC_SITE_URL` (for example, `https://your-domain.in`) under **Settings → Environment variables**, then redeploy. This makes the sitemap and medical-business schema use your real domain.
