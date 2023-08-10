/* eslint-disable jsx-a11y/alt-text */
export default function ShowFullItem({ item, onShowItem, onAdd }) {
  return (
    <div className="full-item">
      <div>
        <img src={"./img1/" + item.img} onClick={() => onShowItem(item)} />
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
