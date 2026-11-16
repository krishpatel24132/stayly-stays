import ListingCard from "./ListingCard";

export default function ListingGrid({
  items, onClear, wishlist,
  emptyTitle = "No exact matches", emptyText = "Try changing your destination, guests or filters.", clearLabel = "Clear filters",
  ...cardProps
}) {
  if (!items.length) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-semibold">{emptyTitle}</h2>
        <p className="mt-1 text-muted-foreground">{emptyText}</p>
        <button onClick={onClear} className="mt-4 font-medium underline">{clearLabel}</button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {items.map((l) => <ListingCard key={l.id} listing={l} wished={wishlist.includes(l.id)} {...cardProps} />)}
    </div>
  );
}
