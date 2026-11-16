import { useEffect, useState } from "react";
import { Check, Heart, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Photo from "./Photo";
import { fmtDate, inr, plural } from "@/lib/utils";

const AMENITIES = ["Wifi", "Kitchen", "Free parking", "Air conditioning", "Workspace", "Hot water"];
const FEE_RATE = 0.1;

export default function ListingModal({ listing: l, onClose, wished, onToggle, dates, nights, guestCount }) {
  const [sent, setSent] = useState(false);
  useEffect(() => setSent(false), [l?.id]);

  const stay = l ? l.price * nights : 0;
  const fee = Math.round(stay * FEE_RATE);
  const picked = dates.start && dates.end;

  return (
    <Dialog open={!!l} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        {l && (
          <>
            <div className="grid h-64 grid-cols-3 gap-1.5 p-1.5 sm:h-80">
              <div className="col-span-2 overflow-hidden rounded-tl-xl"><Photo cat={l.cat} seed={l.seed} images={l.images} slide={0} alt={l.title} /></div>
              <div className="grid grid-rows-2 gap-1.5">
                <div className="overflow-hidden rounded-tr-xl"><Photo cat={l.cat} seed={l.seed} images={l.images} slide={1} alt="Bedroom" /></div>
                <div className="overflow-hidden"><Photo cat={l.cat} seed={l.seed} images={l.images} slide={2} alt="View" /></div>
              </div>
            </div>
            <div className="grid gap-8 p-6 sm:grid-cols-[1fr_300px] sm:p-8">
              <div>
                <DialogTitle className="text-2xl font-semibold leading-tight">{l.title}</DialogTitle>
                <DialogDescription className="mt-2 text-muted-foreground">{l.place} · {l.size}</DialogDescription>
                <p className="mt-2 flex items-center gap-1.5 text-sm"><Star size={14} className="fill-current" /> <b>{l.rating}</b> · {l.reviews} reviews</p>
                <p className="mt-6 leading-relaxed">{l.about}</p>
                <p className="mt-4 text-sm text-muted-foreground">Hosted by {l.host}</p>
                <h3 className="mb-3 mt-6 font-semibold">What this place offers</h3>
                <ul className="grid grid-cols-2 gap-2 text-sm">{AMENITIES.map((a) => <li key={a} className="flex items-center gap-2"><Check size={14} /> {a}</li>)}</ul>
                <Button variant="outline" className="mt-6" onClick={() => onToggle(l.id)}>
                  <Heart size={16} className={wished ? "fill-brand text-brand" : ""} /> {wished ? "Saved" : "Save to wishlist"}
                </Button>
              </div>

              <aside className="h-fit rounded-2xl border p-5 shadow-lg">
                <p><b className="text-xl">{inr(l.price)}</b> night</p>
                <div className="mt-3 rounded-xl border p-3 text-sm">
                  <p className="font-semibold">{picked ? `${fmtDate(dates.start)} – ${fmtDate(dates.end)}` : `Suggested: ${l.dates}`}</p>
                  <p className="text-muted-foreground">
                    {plural(nights, "night")}{guestCount > 0 && ` · ${plural(guestCount, "guest")}`}
                    {!picked && " · pick dates in the search bar"}
                  </p>
                </div>
                <Button size="lg" className="mt-4 w-full" disabled={sent} onClick={() => setSent(true)}>
                  {sent ? <><Check size={16} /> Request sent</> : "Reserve"}
                </Button>
                <p className="mt-2 text-center text-xs text-muted-foreground">{sent ? "Demo only. No payment was taken." : "You won't be charged yet"}</p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="underline">{inr(l.price)} × {plural(nights, "night")}</dt><dd>{inr(stay)}</dd></div>
                  <div className="flex justify-between"><dt className="underline">Stayly service fee</dt><dd>{inr(fee)}</dd></div>
                  <div className="flex justify-between border-t pt-3 font-semibold"><dt>Total before taxes</dt><dd>{inr(stay + fee)}</dd></div>
                </dl>
              </aside>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
