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
- Email delivery: disabled because the handover does not include its backend. The original email service is disconnected.
- Voice generation: retains the original Gemini integration and requires the user's Gemini API key in app settings.

Deploy subsequent rule updates with `firebase deploy --only firestore:rules --project trjohn-woyz`. Hosting configuration is included if Firebase Hosting is selected.

## Pages

- `index.html` (site root): personal worklist, formerly admin.html.
- `user.html`: notes editor, formerly index.html.
- Use the Settings menu to switch between the worklist and notes editor.
- Firebase Hosting redirects old admin URLs to the site root when hosting is deployed.
