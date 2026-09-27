# TR JOHN WOYZ

Clone of the supplied WOYZ Notes handover dated 2026-09-25 (source commit 6c41d13).

Target repository: https://github.com/sujithj19-ux/TR-JOHN-WOYZ
Firebase project: `trjohn-woyz`.

Preserves the main app, personal worklist, mobile/desktop workflows and PWA assets. No patient data or accounts have been copied.

## Setup status

- Firebase Web app: registered and configured for trjohn-woyz.
- Firestore: default database created in asia-south1 (Mumbai), deletion protection enabled; rules deployed successfully.
- Email/password Authentication: enabled. Initial users must be created under Firebase Authentication > Users.
- Single-user workflow: no master administration, user groups, mapped accounts, or cross-account queries. The worklist at admin.html displays only the signed-in account’s notes.
- Firestore permits each authenticated account to access only its own profile and notes; all group and cross-account access is denied.
- Email delivery: disabled because the handover does not include its backend. The original email service is disconnected.
- Voice generation: retains the original Gemini integration and requires the user's Gemini API key in app settings.

Deploy subsequent rule updates with `firebase deploy --only firestore:rules --project trjohn-woyz`. Hosting configuration is included if Firebase Hosting is selected.
