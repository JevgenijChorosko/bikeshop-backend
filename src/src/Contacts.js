import { useEffect, useState } from "react";

export default function AboutUs() {
  const [item, setItem] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/aboutus")
      .then((res) => res.json())
      .then((data) => {
        setItem(data.find((el) => el.key === "contacts"));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="contact-container">
      {item ? (
        <>
          <h2 className="contact-title">{item.name}</h2>
          <p className="contact-details">
            Address: {item.address}, {item.city}, {item.country}, {item.zip}
          </p>
          <p className="contact-details">Phone: {item.phone}</p>
          <p className="contact-details">Email: {item.email}</p>
          <p className="contact-details">
            Website:{" "}
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-website"
            >
              {item.website}
            </a>
          </p>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
