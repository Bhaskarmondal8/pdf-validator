# GitHub-ready deployment

1. Create a new **public** GitHub repository, e.g. `easy-signature-verifier`.
2. Upload this whole project so `.github/workflows/pages.yml` is at the repository root.
3. Go to **Settings → Pages** and set the source to **GitHub Actions**.
4. Push to `main`. The included workflow deploys only the `frontend/` folder to GitHub Pages.
5. Deploy `backend/` separately as a Render Web Service.
6. Copy the Render HTTPS URL into `frontend/index.html`, replacing `REPLACE-WITH-YOUR-API.onrender.com`.
7. Push again. GitHub Actions redeploys the frontend automatically.

### Important
GitHub Pages is static, so it cannot execute the Python verification API itself. The mobile browser talks to the HTTPS backend.
