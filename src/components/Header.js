import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaOpencart } from "react-icons/fa";
import Order from "./Order";

export default function Header({ orders, onDelete }) {
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  function totalPrice() {
    const total = orders.reduce((acc, curr) => {
      const price = parseFloat(curr.price);
      const quantity = curr.quantity;
      return acc + price * quantity;
    }, 0);
    return total;
  }

  return (
    <header>
      <div>
        <span className="logo" onClick={() => navigate("/")}>
          Bicykles Shop
        </span>
        <ul className="nav">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/aboutus")}>About Us</li>
          <li onClick={() => navigate("/contacts")}>Contacts</li>
        </ul>
        <FaOpencart
          onClick={() => setCartOpen(!cartOpen)}
          className={`shop-cart-button ${cartOpen && `active`}`}
        />

        {cartOpen && (
          <div className="shop-cart">
            {orders && orders.length > 0 ? (
              <div>
                {orders.map((el) => (
                  <Order key={el._id} item={el} onDelete={onDelete} />
                ))}
                {/* Kainos korekcija (apvalimas) */}
                <p className="summ">Total price: {totalPrice()}$</p>
              </div>
            ) : (
              <div className="empty">
                <h2> Nothing is not added!</h2>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="presentation"></div>
    </header>
  );
}
