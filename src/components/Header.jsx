import { useRef, useState } from "react";
import { Globe, Heart, Menu, Moon, Sun } from "lucide-react";
import Logo from "./Logo";
import NavTabs from "./NavTabs";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { useDismiss } from "@/hooks/useDismiss";

const MENU = ["Gift cards", "Stayly your home", "Host an experience", "Help Centre"];

export default function Header({ dark, setDark, wishCount, onWishlist, onHome, ...search }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useDismiss(menuRef, menuOpen, () => setMenuOpen(false));

  return (
    <header className="relative z-40 border-b bg-background pb-4">
      <div className="relative flex items-center justify-between px-4 pt-4 sm:px-10">
        <Logo onClick={onHome} />
        <div className="absolute left-1/2 top-3 -translate-x-1/2"><NavTabs /></div>
        <div ref={menuRef} className="relative flex items-center gap-1">
          <a href="#" className="hidden rounded-full px-4 py-3 text-sm font-medium hover:bg-muted lg:block">Become a host</a>
          <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Language"><Globe size={18} /></Button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-haspopup="menu" className="flex items-center gap-3 rounded-full border py-2 pl-3.5 pr-2 hover:shadow-md" aria-label="Open menu">
            <Menu size={16} />
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-muted-foreground text-sm text-background">
              S
              {wishCount > 0 && <b className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] text-white">{wishCount}</b>}
            </span>
          </button>
          {menuOpen && (
            <div role="menu" className="absolute right-0 top-14 z-50 w-60 rounded-2xl border bg-popover py-2 text-sm shadow-2xl">
              <a href="#" className="block px-4 py-3 font-semibold hover:bg-muted">Sign up</a>
              <a href="#" className="block px-4 py-3 hover:bg-muted">Log in</a>
              <hr className="my-2" />
              <button role="menuitem" onClick={() => { setMenuOpen(false); onWishlist(); }} className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-muted">
                <span className="flex items-center gap-2"><Heart size={15} /> Wishlists</span>
                {wishCount > 0 && <span className="text-muted-foreground">{wishCount}</span>}
              </button>
              {MENU.map((m) => <a key={m} href="#" className="block px-4 py-3 hover:bg-muted">{m}</a>)}
            </div>
          )}
        </div>
      </div>
      <SearchBar {...search} />
    </header>
  );
}
