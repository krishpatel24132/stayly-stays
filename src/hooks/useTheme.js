import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useTheme() {
  const prefersDark = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = useLocalStorage("stayly-dark", prefersDark);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  return [dark, setDark];
}
