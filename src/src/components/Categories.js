import { useState, useEffect } from "react";

export default function Categories({ categoryClick }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="categories">
      {categories.map((el) => (
        <div onClick={() => categoryClick(el.key)} key={el.key}>
          {el.name}
        </div>
      ))}
    </div>
  );
}
