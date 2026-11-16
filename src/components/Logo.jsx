export default function Logo({ onClick }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick?.(); }} className="flex items-center gap-1 text-brand" aria-label="Stayly home">
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-1.5 0-2.3 1.2-3 2.8L4 17c-1 2.8.2 5 2.7 5 1.8 0 3.600-1.500 5.300-3.800 1.700 2.300 3.500 3.800 5.300 3.800 2.500 0 3.700-2.200 2.700-5L15 5.800C14.300 4.200 13.500 3 12 3z" />
      </svg>
      <span className="hidden text-[22px] font-bold tracking-tight lg:inline">stayly</span>
    </a>
  );
}
