import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));
export const inr = (n) => "₹" + n.toLocaleString("en-IN");

export const hashStr = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

export const fmtDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
export const nightsBetween = (a, b) => Math.round((b - a) / 864e5);
export const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
