import { Building, Castle, Droplets, House, Landmark, Sailboat, SlidersHorizontal, Snowflake, Sparkles, Tent, TreePine, Waves, Wheat } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { CATEGORIES } from "@/data/listings";
import { cn } from "@/lib/utils";

const ICONS = { Building, Castle, Droplets, House, Landmark, Sailboat, Snowflake, Sparkles, Tent, TreePine, Waves, Wheat };

export default function CategoryBar({ category, setCategory, showTotal, setShowTotal, onOpenFilters, filterCount }) {
  return (
    <div className="sticky top-0 z-30 border-b bg-background shadow-sm">
      <div className="flex items-center gap-4 px-4 sm:px-10">
        <nav className="no-scrollbar flex flex-1 gap-8 overflow-x-auto pt-3" aria-label="Categories">
          {CATEGORIES.map((c) => { const Icon = ICONS[c.icon]; return (
            <button key={c.id} onClick={() => setCategory(c.id)}
              className={cn("flex shrink-0 flex-col items-center gap-1.5 border-b-2 pb-3 text-xs font-medium", category === c.id ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100")}>
              <Icon size={24} strokeWidth={1.5} />{c.label}
            </button>
          ); })}
        </nav>
        <button onClick={onOpenFilters} className="flex shrink-0 items-center gap-2 rounded-xl border px-3 py-3 text-xs font-medium hover:border-foreground md:px-4" aria-label="Filters">
          <SlidersHorizontal size={14} /><span className="hidden md:inline">Filters</span>
          {filterCount > 0 && <b className="grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[10px] text-background">{filterCount}</b>}
        </button>
        <label className="hidden shrink-0 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-xs font-medium lg:flex">
          Display total price <Switch checked={showTotal} onCheckedChange={setShowTotal} aria-label="Display total price" />
        </label>
      </div>
    </div>
  );
}
