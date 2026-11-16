import { useState } from "react";
import { House } from "lucide-react";
import { cn } from "@/lib/utils";
import { scene } from "@/lib/scenes";

// Set VITE_LOCAL_PHOTOS=1 at build time to skip the internet and use only the built-in illustrations
const LOCAL_ONLY = !!import.meta.env.VITE_LOCAL_PHOTOS;

// Search keywords per category: [main, bedroom, surroundings] (used when a listing has no hand-picked photo)
const KEYWORDS = {
  beach: ["livingroom,apartment", "bedroom,interior", "beach,sea"],
  pool: ["villa,swimmingpool", "bedroom,interior", "swimming,pool"],
  cabin: ["cabin,interior", "bedroom,wood", "mountain,forest"],
  city: ["haveli,interior", "bedroom,interior", "jaipur,architecture"],
  camp: ["camping,tent", "tent,interior", "desert,dunes"],
  farm: ["farmhouse,interior", "bedroom,rustic", "plantation,hills"],
  tiny: ["cottage,interior", "bedroom,cozy", "garden,flowers"],
  castle: ["fort,rajasthan", "palace,interior", "palace,india"],
  lake: ["lake,house", "bedroom,interior", "lake,mountains"],
  design: ["modern,livingroom", "bedroom,modern", "architecture,glass"],
  arctic: ["snow,chalet", "cabin,interior", "snow,mountains"],
};

// Real photo fades in over a neutral placeholder. If a photo fails, the next one in the chain is tried.
function PhotoInner({ cat, seed, slide = 0, images = [], alt, className }) {
  const keyword = `https://loremflickr.com/640/640/${(KEYWORDS[cat] || KEYWORDS.beach)[slide]}/all?lock=${(seed % 90000) + slide * 7}`;
  // Fallback chain: hand-picked photo -> keyword photo -> built-in illustration
  const chain = LOCAL_ONLY ? [images[slide], scene(cat, slide, seed)].filter(Boolean) : [images[slide], keyword, scene(cat, slide, seed)].filter(Boolean);
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = chain[step];
  const onError = () => (step < chain.length - 1 ? setStep(step + 1) : setFailed(true));
  return (
    <div className="relative grid h-full w-full place-items-center bg-muted">
      <House size={32} strokeWidth={1.2} className="text-muted-foreground/40" aria-hidden="true" />
      {!failed && (
        <img src={src} alt={alt} loading="lazy" draggable={false} onLoad={() => setLoaded(true)} onError={onError}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0", className)} />
      )}
    </div>
  );
}

export default function Photo(props) {
  return <PhotoInner key={`${props.cat}-${props.seed}-${props.slide}`} {...props} />;
}
