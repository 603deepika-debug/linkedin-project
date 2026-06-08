# LinkedIn Scraper — Express + EJS

A full-featured web app to test all endpoints of the **LinkedIn Scraper API (Real-Time, Fast, Affordable)** on RapidAPI.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Set your RapidAPI key as env var
export RAPIDAPI_KEY="your_key_here"

# 3. Start the server
npm start
# → http://localhost:3000
```

## Project Structure

```
linkedin-scraper/
├── app.js                      # Express entry point
├── routes/
│   └── linkedin.js             # All 13 route handlers
├── services/
│   └── linkedinApi.js          # API wrapper (all endpoints)
├── views/
│   ├── dashboard.ejs           # Endpoint overview
│   ├── error.ejs
│   ├── partials/
│   │   ├── sidebar.ejs
│   │   └── result.ejs          # Reusable JSON result panel
│   ├── profile/
│   │   ├── detail.ejs
│   │   ├── posts.ejs
│   │   ├── experience.ejs
│   │   ├── education.ejs
│   │   ├── skills.ejs
│   │   ├── connections.ejs
│   │   └── upload.ejs          ← POST: import profile by URL
│   ├── company/
│   │   ├── detail.ejs
│   │   ├── employees.ejs
│   │   └── jobs.ejs
│   └── search/
│       ├── people.ejs
│       ├── companies.ejs
│       └── jobs.ejs
└── public/
    ├── css/app.css
    └── js/app.js
```

## Endpoints Covered

| Method | Route                            | Description                    |
|--------|----------------------------------|--------------------------------|
| GET    | /linkedin/profile/detail         | Full profile info              |
| GET    | /linkedin/profile/posts          | Recent posts                   |
| GET    | /linkedin/profile/experience     | Work history                   |
| GET    | /linkedin/profile/education      | Education history              |
| GET    | /linkedin/profile/skills         | Skills & endorsements          |
| GET    | /linkedin/profile/connections    | Network connections            |
| POST   | /linkedin/profile/upload         | Import profile via URL         |
| GET    | /linkedin/company/detail         | Company overview               |
| GET    | /linkedin/company/employees      | Employee list                  |
| GET    | /linkedin/company/jobs           | Job postings                   |
| GET    | /linkedin/search/people          | Search people                  |
| GET    | /linkedin/search/companies       | Search companies               |
| GET    | /linkedin/search/jobs            | Search jobs                    |

## Changing the API Key

Edit `services/linkedinApi.js` line 3, or set env:

```bash
RAPIDAPI_KEY=your_key node app.js
```
