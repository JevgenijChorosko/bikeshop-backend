import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import AboutUs from "./AboutUs";
import Contacts from "./Contacts";

export default function App() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [showFullItem, setShowFullItem] = useState(false);
  const [fullItem, setFullItem] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/bikes")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.log(err));

    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  function chooseCategory(category) {
    if (category === "all") {
      setCurrentItems(items);
      return;
    }
    setCurrentItems(items.filter((el) => el.category === category));
  }

  function deleteOrder(bikeId) {
    fetch(`http://localhost:3001/orders/${bikeId}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }

  function onShowItem(item) {
    setFullItem(item);
    setShowFullItem(!showFullItem);
  }

  function addToOrder(item) {
    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bikeId: item._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Router>
      <div className="wrapper">
        <Header orders={orders} onDelete={deleteOrder} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Categories categoryClick={chooseCategory} />
                <Items
                  onShowItem={onShowItem}
                  items={currentItems}
                  onAdd={addToOrder}
                />
              </>
            }
          />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>

        {showFullItem && (
          <ShowFullItem
            onAdd={addToOrder}
            onShowItem={onShowItem}
            item={fullItem}
          />
        )}
        <Footer />
      </div>
    </Router>
  );
}
