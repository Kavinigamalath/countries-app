# REST Countries App

A React app using the REST Countries API.

## Features

- Fetches data from 4 endpoints: `/all`, `/name`, `/region`, `/alpha`.
- Search, filter by region & language.
- Country detail page.
- Session management via React Context.
- Responsive design with Tailwind CSS.
- Unit & integration tests with Jest & React Testing Library.

## Setup

```bash
npm install
npm run dev       # localhost:5173
npm run build     # production build in dist/
npm run preview   # preview production build
npm run test      # run tests


**`REPORT.md`**

```md
# Report

## Endpoints used

1. `GET /all`  
2. `GET /name/{name}`  
3. `GET /region/{region}`  
4. `GET /alpha/{code}`  

## Challenges

- **Tailwind setup**: needed `postcss.config.js` and correct `content` globs.
- **Language filter**: extracting unique language list from nested objects.
- **Testing CSS imports**: required `identity-obj-proxy` in Jest.

All solved with minor config tweaks.
