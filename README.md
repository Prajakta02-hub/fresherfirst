# FresherFirst

A job portal built only for freshers and interns. Add your skills and every job shows a **skill match %**.

**Live demo:** https://YOUR-USERNAME.github.io/YOUR-REPO/  (replace after deploying)

## Features
- Interactive hero demo: tap skills and watch the match ring change
- 12 entry-level roles (mock data)
- Filters: search, job type, work mode, category, minimum skill match, sort
- Skill-match ring on every job, plus "You have" and "Learn next" skills
- Save jobs, apply with a validated form, track applications
- Light and dark mode
- Data remembered in localStorage

## Tech
React 18, Vite, React Router v6 (HashRouter), Context API, plain CSS, gh-pages

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Deploy on GitHub Pages (free)
1. Push the project to a GitHub repository (branch `main`).
2. Run:
   ```bash
   npm run deploy
   ```
   This builds the app and publishes the `dist` folder to a branch called `gh-pages`.
3. On GitHub open **Settings > Pages**, set **Source** to **Deploy from a branch**, choose branch `gh-pages` and folder `/ (root)`, then Save.
4. After 1 to 2 minutes the site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

To update the live site later: commit and push your changes, then run `npm run deploy` again.

## Folder structure
```
src/
  components/  Navbar, Hero, JobCard, Filters, MatchMeter, Avatar, ThemeToggle
  pages/       Jobs, JobDetails, ApplyForm, MySkills, SavedJobs, Applications
  context/     AppContext (skills, saved jobs, applications)
  data/        jobs.js (mock data)
  utils/       skillMatch.js, useLocalStorage.js
```
