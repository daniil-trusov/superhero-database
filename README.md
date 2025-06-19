# SUPERHERO DATABASE

A web application for managing a superhero catalog with images. Built using **React**, **Tailwind CSS**, **Node.js**, **Express**, and **PostgreSQL**.

---

## PREREQUISITES

- PostgreSQL installed and running;
- `psql` CLI installed and available in PATH;
- PostgreSQL credentials:
  - user;
  - password;
  - host (default: `localhost`);
  - port (default: `5432`);
- Node.js v20 or higher;

## STEP 1 - CONFIGURE DATABASE

1. bash:
   createdb -U <postgres-user> heroes

2. bash:
   psql -U <postgres-user> -d heroes -f backend/db/init.sql

3. Create .env file (see .env.example) with values:
   PG_USER=<postgres-user>
   PG_PASS=<postgres-password>
   PG_HOST=localhost
   PG_PORT=<postgres-port>
   PG_DB=heroes
   PORT=3000

## STEP 2 - CONFIGURE AND RUN THE PROJECT

1. bash:
   cd backend
   npm install
   npm run dev

2. bash:
   cd ../frontend
   npm install
   npm run dev

## ASSUMPTIONS & FEATURES

### Technical:

- Node.js v20+ is required;
- images are uploaded client-side and saved to the local uploads/ folder;
- file paths are stored in the images table;
- backend limits each hero to 10 images max (configured in backend/config/config.js);
- backend correctly handles deleted and newly added images during editing;
- application is structured into multiple pages: list, details, edit, and create;
- several custom React hooks are used for data fetching and logic handling;
- Tailwind CSS is used for styling;
- the layout is mostly responsive (optimized for mobile vertical view);
- loading states and error messages are present (unstyled);
- global layout includes header and footer on every page;

### Main page:

- lists hero cards with pagination (cards limit can be configured in frontend/src/config/config.ts);
- cards show avatar + nickname (links to details);
- edit and delete buttons are included;
- pagination is hidden if total items < 5;

### Details page:

- shows full hero data and gallery (hidden if no images);
- first image is used as avatar;
- if no images or broken links, a fallback is shown from /public or a placeholder service;
- Back, Edit, and Delete buttons work as expected;

### Edit page:

- pre-filled form with all fields and existing images;
- all fields are required and include helpful placeholders;
- gallery supports adding/removing images, has image counter and tip for avatar;
- deleting a hero redirects to the main page;

### Create page:

- reuses the edit form with empty fields;
- on submit, redirects to the new hero's details page;
- navigating back without submitting discards changes;

### Header:

- clickable icon links to main page;
- button to add a new hero;
- available on every page;

### Footer:

- GitHub repository link;
- "Back to top" button;
- author information;

## POSSIBLE IMPROVEMENTS

- add a search bar to filter heroes by nickname;
- extend the schema with more hero attributes and implement filtering;
- allow manual selection of the avatar instead of usage of the first image;
