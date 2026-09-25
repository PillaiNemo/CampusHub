# Digital Campus Service Hub — Hope Africa University

A high-fidelity frontend prototype for a centralized digital platform where students access campus news, schedules, facility bookings, and submit feedback — all in one hub.

Built as part of an IAESTE frontend development & UI/UX design internship.

## Modules

| Module | Route | Description |
| --- | --- | --- |
| Home | `/` | Hero, campus highlights, quick access, announcements preview |
| Campus News Hub | `/news` | Searchable, filterable news listing with loading/empty states |
| Academic Schedule | `/schedule` | Day/faculty-filtered timetable (cards on mobile, table on desktop) |
| Student Dashboard | `/dashboard` | Stats, upcoming events timeline, quick actions |
| Facility Booking | `/booking` | Facility picker, date/time form, confirmation modal |
| Student Feedback | `/feedback` | Rated feedback form with validation and local history |
| Profile | `/profile` | Editable student profile and notification preferences |

## Tech stack

- **React 19** + **Vite** — app shell and dev server
- **React Router 7** — routing
- **Tailwind CSS 4** — design system (see `src/index.css` for tokens)
- **Framer Motion** — page transitions, scroll-linked motion, micro-interactions
- **React Three Fiber / drei / three.js** — hero 3D scene
- **lucide-react** — icons

Data is mocked via static JSON in `src/data/`; forms persist to `localStorage` (see `src/hooks/useLocalStorage.js`) rather than a real backend.

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## Project structure

```
src/
  components/     # shared UI (ui/), layout (layout/), page sections (sections/), and page-specific cards
  pages/          # one component per route
  data/           # mock JSON data
  hooks/          # useLocalStorage, useMediaQuery
  utils/          # cn() class-name helper
```

