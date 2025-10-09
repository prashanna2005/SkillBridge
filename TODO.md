# TODO: Separate Dashboard and Profile for "Both" Users

## Tasks
- [x] Create src/pages/BothDashboard.tsx - New dashboard for "both" users combining mentor and learner stats/views
- [x] Create src/pages/BothProfile.tsx - New profile page for "both" users combining mentor and learner profile info
- [x] Update src/pages/Dashboard.tsx - Remove "both" role handling, keep for learners and mentors
- [x] Update src/App.tsx - Add routes for /both-dashboard and /both-profile
- [x] Update src/context/AuthContext.tsx - Add logic for role-based redirection after login
- [x] Update src/pages/Login.tsx - Ensure correct redirection after login/signup based on role
- [x] Test login/signup flows for all roles
- [x] Test dashboard and profile pages for all roles
- [x] Verify UI/UX consistency and data correctness
- [x] Fix BothDashboard to show combined stats and content
