import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DEFAULT_FILTERS, PRICE_MAX } from "@/data/listings";
import { inr, plural } from "@/lib/utils";

const SORTS = [["recommended", "Recommended"], ["price-asc", "Price: low to high"], ["price-desc", "Price: high to low"], ["rating", "Top rated"]];

export default function FiltersDialog({ open, onOpenChange, filters, setFilters, resultCount }) {
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <div className="border-b p-5 text-center">
          <DialogTitle className="font-semibold">Filters</DialogTitle>
          <DialogDescription className="sr-only">Narrow the stays by price and guest favourites</DialogDescription>
        </div>
        <div className="space-y-8 p-6">
          <section>
            <h3 className="font-semibold">Maximum price per night</h3>
            <p className="mt-1 text-sm text-muted-foreground">{filters.maxPrice >= PRICE_MAX ? "Any price" : `Up to ${inr(filters.maxPrice)}`}</p>
            <input type="range" min={1500} max={PRICE_MAX} step={500} value={filters.maxPrice} onChange={(e) => set({ maxPrice: +e.target.value })}
              aria-label="Maximum price per night" className="mt-4 w-full accent-[hsl(var(--primary))]" />
          </section>
          <section>
            <h3 className="font-semibold">Sort by</h3>
            <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Sort by">
              {SORTS.map(([id, label]) => (
                <button key={id} role="radio" aria-checked={filters.sort === id} onClick={() => set({ sort: id })}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${filters.sort === id ? "border-foreground bg-foreground text-background" : "hover:border-foreground"}`}>
                  {label}
                </button>
              ))}
            </div>
          </section>
          <label className="flex cursor-pointer items-center justify-between gap-4">
            <span><b className="block font-semibold">Guest favourites only</b><span className="text-sm text-muted-foreground">The most loved stays on Stayly</span></span>
            <Switch checked={filters.favouriteOnly} onCheckedChange={(v) => set({ favouriteOnly: v })} aria-label="Guest favourites only" />
          </label>
        </div>
        <div className="flex items-center justify-between border-t p-4">
          <button onClick={() => setFilters(DEFAULT_FILTERS)} className="font-medium underline">Clear all</button>
          <Button variant="dark" size="lg" onClick={() => onOpenChange(false)}>Show {plural(resultCount, "stay")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
