import Item from "./Item";

export default function Items({ items, onShowItem, onAdd }) {
  return (
    <main>
      {items ? (
        items.map((el) => (
          <Item onShowItem={onShowItem} key={el._id} item={el} onAdd={onAdd} />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
