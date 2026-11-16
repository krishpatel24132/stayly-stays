import { useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["Popular", "Arts & culture", "Outdoors", "Mountains", "Beach", "Unique stays", "Categories"];
const PLACES = ["Goa", "Jaipur", "Udaipur", "Manali", "Munnar", "Rishikesh", "Coorg", "Jodhpur", "Varkala", "Alibaug", "Lonavala", "Jaisalmer"];
const COLUMNS = {
  Support: ["Help Centre", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options"],
  Hosting: ["Stayly your home", "Hosting resources", "Community forum", "Hosting responsibly"],
  Stayly: ["Newsroom", "New features", "Careers", "Investors", "Gift cards"],
};

export default function Footer() {
  const [tab, setTab] = useState(0);
  return (
    <footer className="mt-6 border-t bg-muted pb-20">
      <div className="border-b px-4 py-12 sm:px-10">
        <h2 className="mb-5 text-[22px] font-semibold">Inspiration for future getaways</h2>
        <div className="no-scrollbar mb-6 flex gap-6 overflow-x-auto border-b">
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} className={cn("whitespace-nowrap border-b-2 pb-3 text-sm", tab === i ? "border-foreground font-semibold" : "border-transparent text-muted-foreground")}>{t}</button>
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {PLACES.map((p) => <li key={p}><a href="#" className="block font-medium">{p}</a><span className="text-muted-foreground">{TABS[tab]}</span></li>)}
        </ul>
      </div>
      <div className="grid gap-8 border-b px-4 py-10 text-sm sm:grid-cols-3 sm:px-10">
        {Object.entries(COLUMNS).map(([h, links]) => (
          <div key={h}><h4 className="mb-3 font-semibold">{h}</h4>
            <ul className="space-y-3">{links.map((l) => <li key={l}><a href="#" className="hover:underline">{l}</a></li>)}</ul></div>
        ))}
      </div>
      <div className="flex flex-col gap-4 px-4 py-6 text-sm sm:px-10 md:flex-row md:justify-between">
        <p>© 2026 Stayly, Inc. · <a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Terms</a> · <a href="#" className="hover:underline">Sitemap</a></p>
        <p className="flex items-center gap-5 font-medium"><span className="flex items-center gap-2"><Globe size={16} /> English (IN)</span><span>₹ INR</span></p>
      </div>
    </footer>
  );
}
