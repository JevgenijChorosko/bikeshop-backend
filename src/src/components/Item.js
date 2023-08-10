export default function Item({ item, onShowItem, onAdd }) {
  return (
    <div className="item">
      <div className="item-img-container">
        <img
          alt={item.title}
          src={"./img1/" + item.img}
          onClick={() => onShowItem(item)}
          className="item-img"
        />
      </div>
      <div className="item-content">
        <h2>{item.title}</h2>
        <p>{item.desc}</p>
        <b>{item.price}$</b>
        <div className="add-to-cart" onClick={() => onAdd(item)}>
          +
        </div>
      </div>
    </div>
  );
}
