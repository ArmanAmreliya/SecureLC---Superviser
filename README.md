# SecureLC---Superviser

Local development notes and Firebase setup

1. Create a `.env` file in the project root using `.env.example`:

   - Copy `.env.example` to `.env` and fill in the values from your Firebase project settings (Project settings → General → Your apps):

     VITE_FIREBASE_API_KEY=your_api_key_here
     VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id

   - Do NOT commit `.env` to version control. `.env` is already in `.gitignore`.

2. Enable Email/Password sign-in in the Firebase Console (Authentication → Sign-in method).

3. Install dependencies and start the dev server:

```powershell
pnpm install
# SecureLC — Superviser (Web)

This repository contains the Supervisor Dashboard web app built with React + Vite and Material UI. The app is scaffolded to use Firebase Authentication and Firestore (stubs provided). This README covers setup, environment configuration, Firebase setup, development, build, and troubleshooting.

## Quick overview

- Project root: `index.html`, `package.json`, `vite.config.js`
- App source: `src/` — components, pages, services, and config
- Auth helpers: `src/services/authService.js`
- Local Firebase config file (for convenience): `src/firebaseConfig.js` (you can replace this with env-based config for production)

---

## Prerequisites

- Node.js 18+ (recommended)
- A package manager: `pnpm`, `npm`, or `yarn`
- (Optional) A Firebase project if you want real authentication and Firestore access

---

## Environment variables

This project reads Firebase credentials from `src/firebaseConfig.js` by default (for local convenience). For a production setup, prefer environment variables.

Create a `.env` file in the project root using the provided `.env.example`:

```text
cp .env.example .env
# then edit .env and add your real values
```

Required env keys (when using Vite env variables):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Make sure `.env` is in `.gitignore` (it is by default in this repo).

---

## Firebase setup

1. Go to the Firebase Console and create (or open) your project.
2. In Project Settings → Your apps, register a web app if you haven't already and copy the config values (apiKey, authDomain, projectId, etc.).
3. Paste those values into `.env` (or into `src/firebaseConfig.js` if you prefer local testing). If you use `.env`, restart the dev server after changes.
4. Enable Email/Password authentication: Authentication → Sign-in method → enable "Email/Password".

Note: Do not commit production API keys into public repositories. Use secure environment variable storage for deployed environments.

---

## Install and run (development)

Using pnpm (recommended):

```powershell
pnpm install
pnpm run dev
```

Or with npm:

```powershell
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

---

## Build and preview

Build for production:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

---

## Project structure (key files)

- `src/main.jsx` — app entry, mounts React app and ThemeProvider
- `src/theme.js` — MUI theme (colors and component overrides)
- `src/firebaseConfig.js` — local convenience Firebase config (replace with env in production)
- `src/services/authService.js` — signIn, signOutUser, onAuthChange helpers (Firebase)
- `src/services/firestoreService.js` — Firestore helper stubs
- `src/pages/*` — top-level pages (LoginPage, Dashboard, AuditLog, LiveMap)
- `src/components/*` — reusable UI components (RequestCard, RequestTable, etc.)

---

## Authentication flow

- `LoginPage.jsx` provides a form which calls `signIn(email, password)` from `src/services/authService.js`.
- `src/App.jsx` subscribes to auth state via `onAuthChange` and conditionally renders the Dashboard or LoginPage.

---

## Development tips & troubleshooting

- If you see network errors like `identitytoolkit.googleapis.com ... 400`, check your `apiKey` and ensure the `.env` or `src/firebaseConfig.js` values are correct.
- If Vite complains `Failed to parse source for import analysis because the content contains invalid JS syntax. If you are using JSX, make sure to name the file with the .jsx or .tsx extension`, ensure your entry file is `.jsx` (this project uses `src/main.jsx`) and `index.html` points to `/src/main.jsx`.
- If React is not defined in runtime (ReferenceError), ensure your components import React where needed (or enable automatic JSX runtime).
- After editing `.env`, restart the dev server so Vite picks up new env values.

---

## Testing (manual)

- You can test login by enabling Email/Password sign-in in Firebase and creating a test user (Authentication → Users → Add user).
- For local-only development without Firebase, ask me to add an in-memory mock auth provider.

---

## Security

- Never commit production secrets to git. Use `.env` and add it to `.gitignore`.

Sensitive config cleanup:
- The project previously contained a root `firebaseConfig.js` with real API keys. That file was removed from the repository and replaced with `firebaseConfig.example.js` (a template). Do NOT commit your real `firebaseConfig.js`.
- For production deployments use environment variables (Vercel Project Settings → Environment Variables) with the `VITE_...` keys described in the README.
- For deployed environments, inject secrets using your hosting platform's environment variable feature.

---

If you'd like, I can:

- Add a `README.dev.md` with step-by-step screenshots for Firebase console tasks.
- Add React Router and wire up simple navigation between pages.
- Implement the in-memory auth fallback for local dev.

Tell me which of the above you'd like next and I'll implement it.
