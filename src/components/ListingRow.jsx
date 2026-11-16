import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ListingCard from "./ListingCard";

const navBtn = "grid h-8 w-8 place-items-center rounded-full border bg-background transition hover:scale-105 hover:shadow-md";

export default function ListingRow({ title, items, wishlist, ...cardProps }) {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[22px] font-semibold">{title} <span className="grid h-8 w-8 place-items-center rounded-full bg-muted"><ArrowRight size={16} /></span></h2>
        <div className="hidden gap-2 sm:flex">
          <button aria-label="Scroll left" onClick={() => scroll(-1)} className={navBtn}><ChevronLeft size={16} /></button>
          <button aria-label="Scroll right" onClick={() => scroll(1)} className={navBtn}><ChevronRight size={16} /></button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar flex snap-x gap-6 overflow-x-auto pb-1">
        {items.map((l) => (
          <ListingCard key={l.id} listing={l} wished={wishlist.includes(l.id)} className="w-[46%] min-w-[160px] snap-start sm:w-[31%] md:w-[23%] lg:w-[18%] xl:w-[14.8%]" {...cardProps} />
        ))}
      </div>
    </section>
  );
}
