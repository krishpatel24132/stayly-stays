import { useEffect } from "react";

/** Calls onDismiss when the user clicks outside `ref` or presses Escape (only while `active`). */
export function useDismiss(ref, active, onDismiss) {
  useEffect(() => {
    if (!active) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && onDismiss();
    const onKey = (e) => e.key === "Escape" && onDismiss();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [ref, active, onDismiss]);
}
