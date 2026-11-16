# Demo presentation outline (5–7 minutes)

**1. Intro (30 sec)** – What I built: a responsive Airbnb homepage clone called Stayly with React + Tailwind CSS + ShadCN-style components.

**2. Live demo (2 min)**
- Scroll the rows, use arrows, flip through card photos
- Search "Goa", pick dates in the calendar (watch card totals change), open the Who guest counter
- Open Filters, drag the price slider; open Wishlists from the profile menu
- Click category icons to filter; try "Display total" switch
- Heart a few stays (counter updates), open a listing dialog
- Open Filters and try Sort by; press Surprise me; reload to show the Recently viewed row
- Toggle dark mode; resize the window to show responsiveness

**3. Approach (1.5 min)**
- Studied the Airbnb layout and split it into components (Header, SearchBar, CategoryBar, Card, Row, Footer)
- Tailwind mobile-first breakpoints; CSS-variable theme for dark mode
- ShadCN pattern: Button (cva variants), Dialog (Radix), Switch
- Custom hooks: useLocalStorage, useTheme

**4. Challenges (1 min)**
- Sticky header + category bar + dropdowns layering (z-index)
- Horizontal scroll rows that stay responsive
- Closing popovers when clicking outside
- Keeping state in App while components stay reusable

**5. Learnings (1 min)** – Component design, responsive grids, accessibility (aria labels, keyboard focus), deploying (Netlify, Vercel or GitHub Pages; configs are in the repo).

**6. Future improvements** – Real listings API, map view, mobile search sheet with dates and guests, bottom tab bar, auth.

**Live link:** [add your deployed link here]  |  **Code:** [add your GitHub link here]
