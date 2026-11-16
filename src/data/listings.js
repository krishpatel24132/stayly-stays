import { hashStr } from "@/lib/utils";

export const CATEGORIES = [
  { id: "all", label: "Icons", icon: "Sparkles" }, { id: "beach", label: "Beachfront", icon: "Waves" },
  { id: "cabin", label: "Cabins", icon: "TreePine" }, { id: "city", label: "Iconic cities", icon: "Landmark" },
  { id: "pool", label: "Amazing pools", icon: "Droplets" }, { id: "camp", label: "Camping", icon: "Tent" },
  { id: "farm", label: "Farms", icon: "Wheat" }, { id: "tiny", label: "Tiny homes", icon: "House" },
  { id: "castle", label: "Castles", icon: "Castle" }, { id: "lake", label: "Lakefront", icon: "Sailboat" },
  { id: "design", label: "Design", icon: "Building" }, { id: "arctic", label: "Arctic", icon: "Snowflake" },
];

// [place, short title, category, host, price/night, rating, reviews, dates, guests/beds, description, guest favourite?]
const raw = {
  goa: [
    ["Candolim, Goa", "Sea-facing 2BHK, 5 min walk to the beach", "beach", "Maya D'Souza", 5850, 4.91, 212, "Dec 3–8", "4 guests · 2 bedrooms", "Bright flat on the 3rd floor with a balcony that looks straight at the water. Maya leaves a jar of homemade bebinca on arrival.", 1],
    ["Anjuna, Goa", "Portuguese-style villa with a private pool", "pool", "Rohan Naik", 11400, 4.87, 96, "Dec 12–16", "8 guests · 4 bedrooms", "Old family villa with red-tile roof, a mango tree in the garden and a pool that stays warm till late evening."],
    ["Morjim, Goa", "Quiet cottage near the river", "tiny", "Sheetal Kamat", 3200, 4.78, 58, "Nov 28–Dec 2", "2 guests · 1 bedroom", "Small cottage for people who want to read and sleep. Cycles available, the river is a 6-minute walk."],
    ["Arambol, Goa", "Bamboo hut above the cliff", "beach", "Ibrahim Shaikh", 2450, 4.69, 131, "Jan 4–9", "2 guests · 1 bed", "Basic but beautiful. Fan, mosquito net and a deck for sunsets. Shared bathroom is 20 steps away."],
    ["Vagator, Goa", "Garden studio below Chapora Fort", "tiny", "Priya Fernandes", 4100, 4.83, 77, "Dec 20–24", "3 guests · 1 bedroom", "Ground-floor studio opening to a frangipani garden. Breakfast eggs from the neighbour's hens."],
    ["Palolem, South Goa", "Beach hut, wake up to the waves", "beach", "Anthony Gomes", 3900, 4.85, 164, "Jan 12–17", "2 guests · 1 bed", "Wooden hut right on the sand at the quiet end of Palolem. Silent in the morning, busy by 5 pm.", 1],
  ],
  raj: [
    ["Amer, Jaipur", "Restored haveli room around a courtyard", "city", "Kavita Rathore", 6800, 4.94, 305, "Jan 5–9", "3 guests · 1 bedroom", "Painted ceilings, a swing in the courtyard and rooftop tea at 6 pm. Amer Fort is a short auto ride away.", 1],
    ["Udaipur", "Lake-view room in a 200-year-old haveli", "lake", "Dheeraj Mehta", 7900, 4.96, 418, "Feb 2–6", "2 guests · 1 bedroom", "Wake up to Lake Pichola. The rooftop café downstairs does a very good dal baati.", 1],
    ["Jodhpur", "Blue-city rooftop room with fort views", "city", "Aarti Joshi", 3600, 4.82, 189, "Feb 14–18", "2 guests · 1 bedroom", "Narrow lanes, painted doors, and Mehrangarh Fort lit up at night from your window."],
    ["Samode, Rajasthan", "Fort stay with courtyard dinners", "castle", "Raj Singh Samode", 14200, 4.97, 88, "Mar 1–5", "6 guests · 3 bedrooms", "Part of a 17th-century fort run by the family that has lived there for generations. Dinners are served in the courtyard.", 1],
    ["Jaisalmer", "Desert camp with dunes at your door", "camp", "Imran Khan", 4500, 4.76, 240, "Dec 18–21", "2 guests · 1 tent", "Swiss tents with real beds, camel ride at sunset and folk music around the fire. Cold nights, bring a jacket."],
    ["Pushkar", "Mud house with a vegetable garden", "farm", "Lata Sharma", 2800, 4.8, 64, "Jan 22–26", "4 guests · 2 bedrooms", "Natural plaster walls keep it cool. You can pick your own sabzi from the garden."],
  ],
  hills: [
    ["Manali, Himachal", "Deodar-wood cabin in an apple orchard", "cabin", "Tenzin Dolma", 5200, 4.9, 143, "Dec 12–17", "4 guests · 2 bedrooms", "Wood stove, thick quilts and apple trees outside the window. Road access is rough in snow, 4x4 pickups available.", 1],
    ["Kasol, Himachal", "Riverside A-frame", "cabin", "Vikram Thakur", 3300, 4.74, 110, "Nov 30–Dec 3", "3 guests · loft bed", "Sleeps right next to the Parvati river. Hot water is by geyser, WiFi is not great (that's the point)."],
    ["Dharamshala, Himachal", "Cedar cottage with Dhauladhar views", "cabin", "Sonam Wangmo", 4700, 4.88, 92, "Jan 8–12", "4 guests · 2 bedrooms", "Mountain views from every room and a short walk to a small Tibetan café."],
    ["Spiti Valley", "Homestay in a stone house", "arctic", "Dorje Angmo", 2600, 4.92, 51, "Feb 6–10", "4 guests · 2 rooms", "Traditional house, warm kitchen and home-cooked thukpa. Very cold, very quiet, very clear night sky."],
    ["Munnar, Kerala", "Tea-estate bungalow", "farm", "George Mathew", 6100, 4.89, 176, "Jan 14–18", "6 guests · 3 bedrooms", "Colonial-era bungalow surrounded by tea. The caretaker, Joseph, cooks a great appam and stew.", 1],
    ["Coorg, Karnataka", "Coffee plantation cottage", "farm", "Ananya Bopanna", 5600, 4.91, 133, "Dec 5–9", "4 guests · 2 bedrooms", "Smells like coffee blossom in March. Plantation walk included with every stay."],
    ["Nainital, Uttarakhand", "Lakeside house on Naini Lake", "lake", "Harish Bisht", 7200, 4.84, 121, "Nov 25–29", "5 guests · 3 bedrooms", "Old stone house with a verandah on the water. Morning boat rides can be arranged with the family next door."],
    ["Lonavala, Maharashtra", "Concrete-and-glass weekend house", "design", "Neha & Karan", 12800, 4.86, 74, "Dec 19–21", "6 guests · 3 bedrooms", "Architect-designed house in the hills, huge glass walls and a hammock deck. Great for weekends from Mumbai or Pune."],
    ["Gulmarg, Kashmir", "Wooden chalet near the gondola", "arctic", "Bilal Dar", 9500, 4.93, 67, "Jan 28–Feb 1", "5 guests · 2 bedrooms", "Walk to the gondola in 10 minutes. Kangri and kahwa on arrival, heater in every room.", 1],
  ],
};

// Real photos bundled with the project (public/photos). Slide order: main, second room, view.
const photo = (n) => `${import.meta.env.BASE_URL}photos/p${n}.jpg`;
const INTERIORS = [1, 2, 4, 7, 8, 9, 10, 12, 6, 13, 14, 15, 16, 18]; // living rooms, kitchens
const EXTERIORS = [3, 11, 17];  // house front, night view, veranda
const POOL = 5;
// Huts, tents, forts and snow stays have no matching photo, so they lead with an outdoor view.
const isSpecial = (cat, kind) => ["camp", "castle", "arctic"].includes(cat) || ["Hut", "Tent", "Castle"].includes(kind);
let homeCount = 0, specialCount = 0;
const pickImages = (cat, kind) => {
  const L = INTERIORS.length;
  if (isSpecial(cat, kind)) {
    const v = specialCount++;
    return [photo(EXTERIORS[v % 3]), photo(INTERIORS[(v * 5 + 2) % L]), photo(EXTERIORS[(v + 1) % 3])];
  }
  const n = homeCount++;
  return [photo(INTERIORS[n % L]), photo(INTERIORS[(n + 5) % L]), photo(cat === "pool" ? POOL : EXTERIORS[n % 3])];
};
const kindOf = (t) => /villa/i.test(t) ? "Villa" : /flat|bhk|studio/i.test(t) ? "Flat" : /cabin|a-frame|chalet/i.test(t) ? "Cabin" : /hut/i.test(t) ? "Hut" : /camp/i.test(t) ? "Tent" : /fort/i.test(t) ? "Castle" : /room/i.test(t) ? "Room" : "Home";

const build = (rows) => rows.map(([place, title, cat, host, price, rating, reviews, dates, size, about, favourite], i) => ({
  id: place + i, place, title, cat, host, price, rating, reviews, dates, size, about, favourite: !!favourite, maxGuests: parseInt(size, 10) || 2, seed: hashStr(place + title), kind: kindOf(title), images: pickImages(cat, kindOf(title)),
}));

export const ROWS = [
  { title: "Stay in Goa", items: build(raw.goa) },
  { title: "Stay in Rajasthan", items: build(raw.raj) },
  { title: "Stay in the hills", items: build(raw.hills) },
];
export const ALL_LISTINGS = ROWS.flatMap((r) => r.items);
// Every town that has a stay, for the "Where" suggestions
export const DESTINATIONS = [...new Set(ALL_LISTINGS.map((l) => l.place.split(",")[0]))];

// Filters dialog defaults
export const PRICE_MAX = 15000;
export const DEFAULT_FILTERS = { maxPrice: PRICE_MAX, favouriteOnly: false, sort: "recommended" };
