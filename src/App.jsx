import { useMemo, useState } from "react";
import { Dices, Map } from "lucide-react";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import ListingRow from "@/components/ListingRow";
import ListingGrid from "@/components/ListingGrid";
import ListingModal from "@/components/ListingModal";
import FiltersDialog from "@/components/FiltersDialog";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ALL_LISTINGS, DEFAULT_FILTERS, PRICE_MAX, ROWS } from "@/data/listings";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTheme } from "@/hooks/useTheme";
import { inr, nightsBetween, plural } from "@/lib/utils";

const SORTERS = {
  recommended: null,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
};

const NO_GUESTS = { adults: 0, children: 0, infants: 0 };
const NO_DATES = { start: null, end: null };

export default function App() {
  const [dark, setDark] = useTheme();
  const [view, setView] = useState("home"); // "home" | "wishlist"
  const [category, setCategory] = useState("all");
  const [where, setWhere] = useState("");
  const [dates, setDates] = useState(NO_DATES);
  const [guests, setGuests] = useState(NO_GUESTS);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showTotal, setShowTotal] = useState(true);
  const [selected, setSelected] = useState(null);
  const [wishlist, setWishlist] = useLocalStorage("stayly-wishlist", []);
  const [recent, setRecent] = useLocalStorage("stayly-recent", []);

  // Open a stay and remember it in "Recently viewed" (newest first, max 6)
  const openListing = (l) => { setSelected(l); setRecent((r) => [l.id, ...r.filter((x) => x !== l.id)].slice(0, 6)); };
  const surprise = () => openListing(ALL_LISTINGS[Math.floor(Math.random() * ALL_LISTINGS.length)]);

  const toggleWish = (id) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  // Derived values: prices follow the chosen dates (2 nights is the default estimate)
  const nights = dates.start && dates.end ? nightsBetween(dates.start, dates.end) : 2;
  const guestCount = guests.adults + guests.children;
  const query = where.trim().toLowerCase();
  const filterCount = Number(filters.maxPrice < PRICE_MAX) + Number(filters.favouriteOnly) + Number(filters.sort !== "recommended");
  const filtering = category !== "all" || query !== "" || guestCount > 0 || filterCount > 0;

  const results = useMemo(
    () => ALL_LISTINGS.filter((l) =>
      (category === "all" || l.cat === category) &&
      `${l.place} ${l.title}`.toLowerCase().includes(query) &&
      l.maxGuests >= guestCount &&
      l.price <= filters.maxPrice &&
      (!filters.favouriteOnly || l.favourite)).sort(SORTERS[filters.sort] || (() => 0)),
    [category, query, guestCount, filters]
  );
  const recentItems = useMemo(() => recent.map((id) => ALL_LISTINGS.find((l) => l.id === id)).filter(Boolean), [recent]);
  const saved = useMemo(() => ALL_LISTINGS.filter((l) => wishlist.includes(l.id)), [wishlist]);
  const savedTotal = saved.reduce((sum, l) => sum + l.price * nights, 0);

  const clearAll = () => { setCategory("all"); setWhere(""); setGuests(NO_GUESTS); setFilters(DEFAULT_FILTERS); };
  const goHome = () => { setView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const cardProps = { showTotal, nights, wishlist, onToggle: toggleWish, onOpen: openListing };

  return (
    <>
      <Header dark={dark} setDark={setDark} wishCount={wishlist.length} onWishlist={() => { setView("wishlist"); window.scrollTo({ top: 0 }); }} onHome={goHome}
        where={where} setWhere={setWhere} dates={dates} setDates={setDates} guests={guests} setGuests={setGuests}
        onSearch={() => { setView("home"); window.scrollTo({ top: 260, behavior: "smooth" }); }} />
      {view === "home" && (
        <CategoryBar category={category} setCategory={setCategory} showTotal={showTotal} setShowTotal={setShowTotal}
          onOpenFilters={() => setFiltersOpen(true)} filterCount={filterCount} />
      )}

      <main className="px-4 pt-8 sm:px-10">
        {view === "wishlist" ? (
          <>
            <h1 className="text-[32px] font-semibold">Wishlists</h1>
            <p className="mb-6 mt-1 text-muted-foreground">
              {saved.length ? `${plural(saved.length, "saved stay")} · about ${inr(savedTotal)} for ${plural(nights, "night")} if you booked them all` : "Your saved stays will appear here."}
            </p>
            <ListingGrid items={saved} onClear={goHome} emptyTitle="No saved stays yet" emptyText="Tap the heart on any stay and it will show up here." clearLabel="Explore stays" {...cardProps} />
          </>
        ) : filtering ? (
          <>
            <p className="mb-4 text-sm font-medium" aria-live="polite">{plural(results.length, "stay")}</p>
            <ListingGrid items={results} onClear={clearAll} {...cardProps} />
          </>
        ) : (
          <>
            {recentItems.length > 0 && <ListingRow title="Recently viewed" items={recentItems} {...cardProps} />}
            {ROWS.map((r) => <ListingRow key={r.title} title={r.title} items={r.items} {...cardProps} />)}
          </>
        )}
      </main>

      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        <Button variant="dark" onClick={surprise} className="h-12 rounded-full px-5 shadow-xl hover:scale-105">
          <Dices size={16} /> Surprise me
        </Button>
        <Button variant="dark" className="h-12 rounded-full px-5 shadow-xl hover:scale-105">
          Show map <Map size={16} />
        </Button>
      </div>
      <Footer />
      <FiltersDialog open={filtersOpen} onOpenChange={setFiltersOpen} filters={filters} setFilters={setFilters} resultCount={results.length} />
      <ListingModal listing={selected} onClose={() => setSelected(null)} wished={selected ? wishlist.includes(selected.id) : false}
        onToggle={toggleWish} dates={dates} nights={nights} guestCount={guestCount} />
    </>
  );
}
