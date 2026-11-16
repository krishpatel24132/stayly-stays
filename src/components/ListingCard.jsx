import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import Photo from "./Photo";
import { cn, inr, plural } from "@/lib/utils";

const arrow = "absolute top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-neutral-800 opacity-0 shadow-md transition group-hover:opacity-100 hover:scale-105";

export default function ListingCard({ listing: l, wished, onToggle, onOpen, showTotal, nights = 2, className }) {
  const [slide, setSlide] = useState(0);
  return (
    <article className={cn("group shrink-0", className)}>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
        <button onClick={() => onOpen(l)} className="absolute inset-0" aria-label={`View ${l.title}`}>
          <Photo cat={l.cat} seed={l.seed} slide={slide} images={l.images} alt={`${l.title} in ${l.place}`} />
        </button>
        {l.favourite && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-neutral-900 backdrop-blur">Guest favourite</span>}
        <button onClick={() => onToggle(l.id)} aria-pressed={wished} aria-label={wished ? "Remove from wishlist" : "Save to wishlist"} className="absolute right-3 top-3 transition active:scale-110">
          <Heart size={26} strokeWidth={wished ? 0 : 1.8} className={wished ? "fill-brand" : "fill-black/50 text-white"} />
        </button>
        {slide > 0 && <button aria-label="Previous photo" onClick={() => setSlide(slide - 1)} className={cn(arrow, "left-2")}><ChevronLeft size={16} /></button>}
        {slide < 2 && <button aria-label="Next photo" onClick={() => setSlide(slide + 1)} className={cn(arrow, "right-2")}><ChevronRight size={16} /></button>}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1">
          {[0, 1, 2].map((i) => <i key={i} className={cn("h-1.5 w-1.5 rounded-full", i === slide ? "bg-white" : "bg-white/60")} />)}
        </div>
      </div>
      <div className="mt-3 text-[15px] leading-snug">
        <h3 className="truncate font-medium">{l.kind} in {l.place.split(",")[0]}</h3>
        <p className="text-muted-foreground">
          {showTotal ? `${inr(l.price * nights)} for ${plural(nights, "night")}` : `${inr(l.price)} night`} · <Star size={12} className="mb-0.5 inline fill-current" /> {l.rating}
        </p>
      </div>
    </article>
  );
}
