import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [["🏠", "Homes"], ["🎈", "Experiences"], ["🛎️", "Services"]];

export default function NavTabs() {
  const [active, setActive] = useState(0);
  return (
    <div className="hidden gap-8 md:flex">
      {TABS.map(([emoji, label], i) => (
        <button key={label} onClick={() => setActive(i)}
          className={cn("flex items-center gap-2 border-b-2 pb-2 text-[15px]", active === i ? "border-foreground font-semibold" : "border-transparent text-muted-foreground hover:text-foreground")}>
          <span className="text-2xl">{emoji}</span>{label}
          {i > 0 && <span className="-mt-3 rounded-full bg-foreground px-1.5 py-0.5 text-[10px] text-background">NEW</span>}
        </button>
      ))}
    </div>
  );
}
