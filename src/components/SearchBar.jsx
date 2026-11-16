import { useRef, useState } from "react";
import { MapPin, Minus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import DateRangePicker from "./DateRangePicker";
import { DESTINATIONS } from "@/data/listings";
import { useDismiss } from "@/hooks/useDismiss";
import { cn, fmtDate, plural } from "@/lib/utils";

const cell = "min-w-0 cursor-pointer rounded-full px-6 py-3.5 text-left transition hover:bg-muted";
const GUEST_ROWS = [["adults", "Adults", "Ages 13 or above"], ["children", "Children", "Ages 2–12"], ["infants", "Infants", "Under 2"]];
const Divider = () => <i className="h-8 w-px shrink-0 bg-border" />;

const guestLabel = (g) => {
  const total = g.adults + g.children;
  const parts = [total && plural(total, "guest"), g.infants && plural(g.infants, "infant")].filter(Boolean);
  return parts.join(", ") || "Add guests";
};

export default function SearchBar({ where, setWhere, dates, setDates, guests, setGuests, onSearch }) {
  const [open, setOpen] = useState(null); // "where" | "in" | "out" | "who" | null
  const ref = useRef(null);
  const close = () => setOpen(null);
  useDismiss(ref, !!open, close);

  const q = where.trim().toLowerCase();
  const suggestions = DESTINATIONS.filter((d) => d.toLowerCase().includes(q));
  const active = (id) => open === id && "bg-muted shadow-md";

  // Children/infants need at least one adult, like the real site
  const change = (key, delta) => setGuests((g) => {
    const n = { ...g, [key]: Math.min(16, Math.max(0, g[key] + delta)) };
    if (n.adults === 0 && (n.children || n.infants)) n.adults = 1;
    return n;
  });

  return (
    <>
      {/* Desktop */}
      <div ref={ref} className="relative mx-auto mt-2 hidden max-w-[850px] md:block">
        <div className="flex items-center rounded-full border bg-background pr-2 shadow-[0_3px_12px_rgba(0,0,0,.12)]">
          <label className={cn(cell, "flex-[1.4]", active("where"))} onClick={() => setOpen("where")}>
            <div className="text-xs font-semibold">Where</div>
            <input value={where} onFocus={() => setOpen("where")} onChange={(e) => setWhere(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (close(), onSearch())}
              placeholder="Search destinations" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </label>
          <Divider />
          <button type="button" className={cn(cell, "flex-1", active("in"))} onClick={() => setOpen("in")}>
            <div className="text-xs font-semibold">Check in</div>
            <div className={cn("text-sm", !dates.start && "text-muted-foreground")}>{dates.start ? fmtDate(dates.start) : "Add dates"}</div>
          </button>
          <Divider />
          <button type="button" className={cn(cell, "flex-1", active("out"))} onClick={() => setOpen("out")}>
            <div className="text-xs font-semibold">Check out</div>
            <div className={cn("text-sm", !dates.end && "text-muted-foreground")}>{dates.end ? fmtDate(dates.end) : "Add dates"}</div>
          </button>
          <Divider />
          <div role="button" tabIndex={0} onClick={() => setOpen("who")} onKeyDown={(e) => e.key === "Enter" && setOpen("who")}
            className={cn(cell, "flex flex-[1.2] items-center justify-between gap-2", active("who"))}>
            <div>
              <div className="text-xs font-semibold">Who</div>
              <div className={cn("truncate text-sm", guestLabel(guests) === "Add guests" && "text-muted-foreground")}>{guestLabel(guests)}</div>
            </div>
            <Button onClick={(e) => { e.stopPropagation(); close(); onSearch(); }} className="h-12 rounded-full px-4" aria-label="Search">
              <Search size={16} strokeWidth={2.6} />{open && "Search"}
            </Button>
          </div>
        </div>

        {open === "where" && (
          <div className="absolute z-40 mt-3 w-[380px] rounded-3xl border bg-popover p-4 shadow-2xl">
            <div className="px-2 pb-2 text-xs font-semibold">{q ? "Matching destinations" : "Suggested destinations"}</div>
            {suggestions.length === 0 && <p className="px-2 py-4 text-sm text-muted-foreground">No stays found for “{where}”.</p>}
            {suggestions.slice(0, 6).map((d) => (
              <button key={d} onClick={() => { setWhere(d); setOpen("in"); }} className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-muted">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-muted"><MapPin size={18} /></span>
                <span className="text-sm">{d}, India</span>
              </button>
            ))}
          </div>
        )}

        {(open === "in" || open === "out") && (
          <div className="absolute left-1/2 z-40 mt-3 -translate-x-1/2 rounded-3xl border bg-popover p-6 shadow-2xl">
            <DateRangePicker value={dates} onChange={setDates} onComplete={(step) => setOpen(step === "start" ? "out" : "who")} />
          </div>
        )}

        {open === "who" && (
          <div className="absolute right-0 z-40 mt-3 w-[360px] divide-y rounded-3xl border bg-popover px-6 py-2 shadow-2xl">
            {GUEST_ROWS.map(([key, label, hint]) => (
              <div key={key} className="flex items-center justify-between py-4">
                <div><div className="text-sm font-semibold">{label}</div><div className="text-sm text-muted-foreground">{hint}</div></div>
                <div className="flex items-center gap-3">
                  <button aria-label={`Fewer ${label.toLowerCase()}`} disabled={!guests[key]} onClick={() => change(key, -1)} className="grid h-8 w-8 place-items-center rounded-full border border-muted-foreground/60 disabled:opacity-30"><Minus size={14} /></button>
                  <span className="w-5 text-center text-sm">{guests[key]}</span>
                  <button aria-label={`More ${label.toLowerCase()}`} onClick={() => change(key, 1)} className="grid h-8 w-8 place-items-center rounded-full border border-muted-foreground/60"><Plus size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="mt-3 px-4 md:hidden">
        <label className="flex items-center gap-3 rounded-full border px-5 py-3 shadow-md">
          <Search size={18} strokeWidth={2.6} />
          <input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="Start your search" className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-foreground" />
        </label>
      </div>
    </>
  );
}
