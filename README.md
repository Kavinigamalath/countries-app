### Name: Kavini Gamalath
### Student Number: IT22190598
### Semester: Year 03 Semester 01  (2025)

# REST Countries Application

A React frontend application consuming the [REST Countries API](https://restcountries.com/), built as part of SE3040 – Application Frameworks (Assignment 02) at SLIIT.
## Live Demo

This app is deployed on Cloudflare Pages:

👉 [https://countries-app-ahb.pages.dev](https://countries-app-ahb.pages.dev)

_Deployed via Cloudflare Pages (connected to GitHub)_  

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Development & Build](#development--build)
- [Testing](#testing)
- [Deployment](#deployment)
- [Brief Report](#brief-report)
- [Fulfillment of Marking Criteria](#fulfillment-of-marking-criteria)

---

## Features

- **Country Listing**: Displays all countries (flag, name, population, region, capital).  
- **Search & Filter**:  
  - Search by name (`/name/{name}`)  
  - Filter by region (`/region/{region}`) and by language  
- **Detail View**: Click a country to see full details via `/alpha/{code}`.  
- **User Session**: Supports login, logout, and account deletion using `Google Sign-In` via Firebase Authentication. Favorite countries are persistently stored and managed in `Firebase Firestore`.  
- **Responsive Design**: Tailwind CSS and Material-UI for mobile‑first, responsive UI. 
 

---

## Tech Stack

- **Frontend**: React (functional components & hooks)  
- **Routing**: React Router v6  
- **HTTP Client**: Axios  
- **Styling**: Tailwind CSS v3 & Material-UI  
- **Testing**: Jest & React Testing Library  
- **Build Tool**: Vite  
- **Version Control**: Git (Classroom & personal remotes)  

---
## Setup & Installation

1. **Clone the Repository**:
  ```bash
git clone https://github.com/Kavinigamalath/countries-app.git
or
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-Kavinigamalath
   ```
2. **create .env file**:
  ```bash
VITE_FIREBASE_API_KEY= Your_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN= Your_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID= Your_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET= Your_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID= Your_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID= Your_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID= Your_FIREBASE_MEASUREMENT_ID
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```

---

## Development & Build

### Run in development mode:
```bash
npm run dev
```
Open your browser and visit: [http://localhost:5173](http://localhost:5173)

### Build for production:
```bash
npm run build
```

### Preview the production build:
```bash
npm run preview
```

---

## Testing

### Run all tests:
```bash
npm run test
```

### Generate test coverage report:
```bash
npm run test -- --coverage
```

### Run a specific test file:
```bash
npx jest src/tests/Home.integration.test.jsx
```

---

## Deployment

You can deploy this app using platforms like [Cloudflare](https://www.cloudflare.com/) [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).

- **Build Command**: `npm run build`  
- **Publish Directory**: `dist/`

Once deployed, your site will be available at the URL provided by your hosting service.

## Live Demo

This app is deployed on Cloudflare Pages:

👉 [https://countries-app-ahb.pages.dev](https://countries-app-ahb.pages.dev)

_Deployed via Cloudflare Pages (connected to GitHub)_  
---

## Brief Report

### APIs Used

- `GET /all` – fetch all countries  
- `GET /name/{name}` – search by name  
- `GET /region/{region}` – filter by region  
- `GET /alpha/{code}` – detail view by country code  

### Challenges & Resolutions
- **CORS errors when calling REST Countries API in development**: Solved by using vite.config.js with proper proxy or directly calling HTTPS endpoints in the client.
- **Difficulty managing user sessions across refresh and routing**: Used onAuthStateChanged() from Firebase Auth to persist login state and load favorites on app load.
- **Google Sign-In failing on deployed domain (Cloudflare Pages)**: Added the domain to Firebase Auth..Authentication..Sign-in Method..Authorized domains.
- **Slow API response time for large /all endpoint**: Added loading spinners and optimized rendering using React memoization and conditional rendering.
- **Issues with FireStore document structure (overwrites)**: Solved by using document paths like favorites/{uid} and ensuring .set() with { merge: true }.
- **Tailwind Setup**: Required `postcss.config.js` and correct purge globs to remove unused styles.  
- **React Router in Tests**: Used polyfill for `TextEncoder` and mocked `react-router-dom` to fix hook-related test errors.  
- **Language Filter**: Used a `Set` and `useMemo` to extract unique languages from nested API responses.  
- **Favorites Persistence**: User-selected favorite countries are stored and retrieved using `Firebase Firestore`, ensuring persistent access across sessions.

---

## Fulfillment of Marking Criteria

| Criterion                                | How It’s Met                                                                                       |
|------------------------------------------|----------------------------------------------------------------------------------------------------|
| 1. Functionality & Correctness (8 M)     | ✔ All features implemented, no runtime errors, functional country list, search, and detail views. |
| 2. API Integration & Data Handling (2 M) | ✔ Used 4 endpoints; parsed and displayed key data (name, region, flag, etc.).                     |
| 3. Session Management (2 M)              | ✔ handled using Firebase Authentication with `Google Sign-In`, and user favorites are persistently stored in `Firebase Firestore`.                      |
| 4. Design & Usability (4 M)              | ✔ Clean, responsive UI with Tailwind and  Material-UI; mobile-first grid layout and accessible components.         |
| 5. Code Quality & Best Practices (4 M)   | ✔ Functional components, hooks, modular structure, and meaningful Git commit history.             |
| 6. Documentation & Reporting (2 M)       | ✔ Detailed README with instructions and brief technical report.                                   |
| 7. Testing (2 M)                         | ✔ Unit and integration tests for key views and flows.                                             |

---

Thank you for reviewing! Feel free to explore the code, run the tests, and view the live demo.
