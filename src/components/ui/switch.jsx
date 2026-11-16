import { cn } from "@/lib/utils";

export function Switch({ checked, onCheckedChange, ...props }) {
  return (
    <button
      type="button" role="switch" aria-checked={checked} onClick={() => onCheckedChange(!checked)}
      className={cn("h-6 w-10 shrink-0 rounded-full p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", checked ? "bg-foreground" : "bg-muted-foreground/50")}
      {...props}
    >
      <span className={cn("block h-5 w-5 rounded-full bg-background transition-transform", checked && "translate-x-4")} />
    </button>
  );
}
