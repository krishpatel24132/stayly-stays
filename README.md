# Stayly – Airbnb Homepage Clone

A fully responsive clone of the Airbnb homepage built with **React**, **Tailwind CSS** and **ShadCN-style UI components** (Radix UI + class-variance-authority). Built as a frontend internship project.

## Features
**Airbnb homepage replication**
- Header with Homes / Experiences / Services tabs and a user dropdown menu
- Search bar (Where, Check in, Check out, Who) with destination suggestions and a guest counter
- Sticky category bar with filtering, Filters button and "Display total before taxes" switch
- Horizontal scrolling listing rows with arrow controls, photo carousel on every card
- Footer with "Inspiration for future getaways" tabs, link columns, language and currency

**Creative additions**
- Real photo gallery for each stay (main photo, bedroom, surroundings)
- Dark mode (remembers your choice)
- Wishlist hearts saved in `localStorage`, with a counter on the profile icon
- Listing detail dialog with a Reserve panel (ShadCN Dialog on Radix UI)
- Live search and category filtering with an empty state
- Total price vs per-night price toggle

## What's new in v1.1
- **Date-range calendar** in the search bar (Check in / Check out). Card prices now follow the chosen number of nights.
- **Guests: Adults / Children / Infants** counters. Guest count filters stays by capacity.
- **Live destination suggestions** that filter as you type, built from the real listings.
- **Filters dialog** (max price slider, guest favourites only) with an active-filter badge.
- **Wishlists page** from the profile menu (empty state included).
- **Reserve panel** with night count, service fee, total and a demo confirmation.
- **Fixes:** profile menu closes on outside click / Esc, search popovers close on outside click / Esc, no white flash in dark mode on reload, labelled switches for screen readers, Filters button now visible on mobile.

## What's new in v1.3
- Fixed the `jsconfig.json` deprecation warning (removed `baseUrl`).
- Added deployment configs for Netlify, Vercel and GitHub Pages.

## What's new in v1.2
- **Your own photos:** 18 real photos bundled in `public/photos` and used on every card and in the detail gallery.
- **Surprise me:** a button next to "Show map" that opens a random stay.
- **Recently viewed:** a row at the top of the home page that remembers the last 6 stays you opened (localStorage).
- **Sort by:** Recommended, price low to high, price high to low, top rated, inside the Filters dialog.
- **Wishlist total:** the Wishlists page shows what all saved stays would cost for your chosen nights.

## Tech stack
React 18 · Vite · Tailwind CSS 3 · Radix UI (Dialog, Slot) · class-variance-authority · lucide-react

## Getting started
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

## Project structure
```
public/photos/         # bundled stay photos
src/
├─ components/
│  ├─ ui/              # ShadCN-style primitives: button, dialog, switch
│  ├─ Photo.jsx        # listing photos with placeholder and illustration fallback
│  ├─ Header.jsx  Logo.jsx  NavTabs.jsx  SearchBar.jsx
│  ├─ CategoryBar.jsx
│  ├─ DateRangePicker.jsx  FiltersDialog.jsx
│  ├─ ListingCard.jsx  ListingRow.jsx  ListingGrid.jsx  ListingModal.jsx
│  └─ Footer.jsx
├─ data/listings.js    # categories, sample listings, photo assignment
├─ lib/scenes.js       # built-in illustrations (photo fallback)
├─ hooks/              # useLocalStorage, useTheme, useDismiss
├─ lib/utils.js        # cn() helper and currency formatter
├─ App.jsx             # state and page composition
└─ index.css           # Tailwind + theme variables (light/dark)
```

## Design decisions
- **Component-based:** every UI section is its own component; App only holds state.
- **Theme tokens:** colors are CSS variables, so light/dark mode works by toggling one class.
- **Responsive:** mobile-first Tailwind breakpoints; the search bar and category bar adapt to small screens.
- **Images:** 18 real stay photos are bundled in `public/photos/` and assigned to listings in `data/listings.js`, so photos never change or fail to load. Built-in illustrations in `lib/scenes.js` remain as a fallback if a photo is missing.
- **Content:** the 21 sample listings are written by hand (hosts, prices, descriptions) so the page reads like a real catalogue.
- **Documentation:** each component, hook and data block carries short comments explaining what it does and why.

## Deployment
The build uses a relative base path (`base: "./"`), so the same `dist` folder works on every host.

**Netlify (fastest):** run `npm run build`, then drag the `dist` folder onto app.netlify.com/drop. Or connect the repo (settings come from `netlify.toml`).
**Vercel:** push to GitHub, import the repo on vercel.com, keep the "Vite" preset, click Deploy (settings come from `vercel.json`).
**GitHub Pages:** push to a repo with a `main` branch, open Settings > Pages and set Source to "GitHub Actions". `.github/workflows/deploy.yml` builds and publishes on every push.

> Educational project. Not affiliated with Airbnb.
