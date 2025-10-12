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
pnpm run dev
```

(Or use `npm install` / `npm run dev` if you prefer.)

4. The app's auth helpers live in `src/services/authService.js` and use the firebase config from `src/firebaseConfig.js` for local testing.

If you'd like a dev-only in-memory auth flow instead of Firebase during development, tell me and I can add that as an alternative.
