/* eslint-disable jsx-a11y/alt-text */
import { FaTrash } from "react-icons/fa";

export default function Order({ item, onDelete }) {
  return (
    <div className="item">
      <div>
        <div className="flexContainer">
          <img src={"./img1/" + item.img} />
          <div>
            <h2>{item.title}</h2>
            <b>{item.price}$</b>
          </div>
        </div>
      </div>
      <div className="quantityIcon">
        <span>{item.quantity}</span>
        <FaTrash className="delete-icon" onClick={() => onDelete(item._id)} />
      </div>
    </div>
  );
}
