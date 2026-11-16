import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const same = (a, b) => !!a && !!b && a.getTime() === b.getTime();

function Month({ year, month, value, onPick }) {
  const first = new Date(year, month, 1);
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(first.getDay()).fill(null), ...Array.from({ length: days }, (_, i) => new Date(year, month, i + 1))];
  const min = today();
  return (
    <div className="w-[260px]">
      <h3 className="mb-3 text-center text-sm font-semibold">{first.toLocaleString("en-IN", { month: "long", year: "numeric" })}</h3>
      <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">{WEEKDAYS.map((d, i) => <span key={i} className="py-1">{d}</span>)}</div>
      <div className="grid grid-cols-7">
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const past = d < min;
          const edge = same(d, value.start) || same(d, value.end);
          const inside = value.start && value.end && d > value.start && d < value.end;
          return (
            <button key={i} type="button" disabled={past} onClick={() => onPick(d)} aria-label={d.toDateString()} aria-pressed={edge}
              className={cn("h-9 text-sm transition-colors",
                past && "cursor-not-allowed text-muted-foreground/40 line-through",
                inside && "bg-muted",
                edge && "rounded-full bg-foreground font-semibold text-background",
                !past && !edge && "hover:rounded-full hover:ring-1 hover:ring-foreground")}>
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Two-month range calendar. onComplete("start" | "end") fires after each pick so the parent can move focus. */
export default function DateRangePicker({ value, onChange, onComplete }) {
  const [cursor, setCursor] = useState(() => ({ y: today().getFullYear(), m: today().getMonth() }));
  const shift = (n) => setCursor(({ y, m }) => { const d = new Date(y, m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });
  const second = new Date(cursor.y, cursor.m + 1, 1);
  const atNow = cursor.y === today().getFullYear() && cursor.m === today().getMonth();

  const pick = (d) => {
    const { start, end } = value;
    if (!start || end || d <= start) { onChange({ start: d, end: null }); onComplete?.("start"); }
    else { onChange({ start, end: d }); onComplete?.("end"); }
  };
  const nav = "absolute top-0 grid h-8 w-8 place-items-center rounded-full hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div>
      <div className="relative flex gap-8">
        <button type="button" aria-label="Previous month" disabled={atNow} onClick={() => shift(-1)} className={cn(nav, "left-0")}><ChevronLeft size={16} /></button>
        <Month year={cursor.y} month={cursor.m} value={value} onPick={pick} />
        <Month year={second.getFullYear()} month={second.getMonth()} value={value} onPick={pick} />
        <button type="button" aria-label="Next month" onClick={() => shift(1)} className={cn(nav, "right-0")}><ChevronRight size={16} /></button>
      </div>
      <div className="mt-4 flex justify-end">
        <button type="button" onClick={() => onChange({ start: null, end: null })} className="text-sm font-medium underline">Clear dates</button>
      </div>
    </div>
  );
}
