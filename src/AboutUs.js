import { useEffect, useState } from "react";

export default function AboutUs() {
  const [paragraph_1, setParagraph_1] = useState("");
  const [paragraph_2, setParagraph_2] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/aboutus")
      .then((res) => res.json())
      .then((data) => {
        setParagraph_1(data.find((el) => el.key === "aboutus").text);
        setParagraph_2(data.find((el) => el.key === "mission").text);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {paragraph_1 ? (
        <>
          <h1 className="aboutUs">About Us</h1>
          <p className="aboutUsText">{paragraph_1}</p>
          <h2 className="mission">Our Mission and Values</h2>
          <p className="aboutUsText">{paragraph_2}</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
