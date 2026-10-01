# TR JOHN WOYZ

Clone of the supplied WOYZ Notes handover dated 2026-09-25 (source commit 6c41d13).

Target repository: https://github.com/sujithj19-ux/TR-JOHN-WOYZ
Firebase project: `trjohn-woyz`.

Preserves the main app, personal worklist, mobile/desktop workflows and PWA assets. No patient data or accounts have been copied.

## Setup status

- Firebase Web app: registered and configured for trjohn-woyz.
- Firestore: default database created in asia-south1 (Mumbai), deletion protection enabled; rules deployed successfully.
- Email/password Authentication: enabled. The permitted account is selected by Firebase UID.
- Single-user workflow: no master administration, user groups, mapped accounts, or cross-account queries. The default worklist at index.html displays only the signed-in account’s notes.
- Both pages and deployed Firestore rules permit only UID `8ImNHj4364X7vU2dqH3pJ1Yha6x1` to access its own profile and notes. All other accounts, group access, and cross-account access are denied.
- Email delivery: frontend workflow is present but backend sending is not yet activated. Planned backend: Firebase/Cloud Function endpoint called by `user.html`, sending mail through Gmail SMTP with a Gmail App Password stored only in backend secrets/environment variables. Do not place Gmail credentials in any HTML or client-side JavaScript file.
- Voice generation: retains the original Gemini integration and requires the user's Gemini API key in app settings.

Deploy subsequent rule updates with `firebase deploy --only firestore:rules --project trjohn-woyz`. Hosting configuration is included if Firebase Hosting is selected.

## Planned email activation

The app already contains the mobile/desktop email workflow: the doctor selects Prescription, Advice, Medical Certificate, or Reply Letter, enters the recipient email address, previews the attachment, and presses Send. `user.html` currently has `EMAIL_FUNCTION_URL` empty, so Send shows that email is not configured.

Planned implementation:

1. Create or choose the clinic Gmail sender account.
2. Enable 2-Step Verification on that Gmail account.
3. Generate a Gmail App Password for SMTP sending.
4. Create a Firebase/Cloud Function HTTPS endpoint that accepts the existing payload from `user.html`.
5. Store Gmail SMTP username and app password only in backend secrets/environment variables. Never store them in `user.html`, GitHub Pages, or any browser-visible file.
6. The function sends the generated HTML/PDF-style attachment by Gmail SMTP.
7. Paste the deployed endpoint URL into `const EMAIL_FUNCTION_URL = ''` in `user.html`, then bump `sw.js` cache version and redeploy/push.

Expected user workflow after activation: enter receiver email in the app and press Send. The Gmail app does not open. The backend sends automatically from the configured clinic Gmail account.

## Pages

- `index.html` (site root): personal worklist, formerly admin.html.
- `user.html`: notes editor, formerly index.html.
- Use the Settings menu to switch between the worklist and notes editor.
- Firebase Hosting redirects old admin URLs to the site root when hosting is deployed.

## Install on mobile

Open https://sujithj19-ux.github.io/TR-JOHN-WOYZ/user.html on the phone.

- iPhone/iPad: Safari → Share → Add to Home Screen → Open as Web App (if shown) → Add.
- Android: Chrome menu → Install app / Add to Home screen.

The installed Doctor WOYZ app launches user.html. The website root remains the worklist.
The icon uses the dark red recording-symbol-and-W design supplied as a reference.
Existing installations may need removal and reinstallation to refresh the home-screen icon.
The app shell is cached; sign-in, Firestore sync and Gemini voice processing require an internet connection.
