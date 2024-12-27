import React, { useState, useEffect } from "react";
import logo from "../../logo.png"
import { useNavigate } from "react-router-dom";
import "./header.css"
function Header() {
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="header">
      <div className="img-div" onClick={() => navigate("/")}>
        <img src={logo} className="header-img" alt="" />
        <p
          style={{
            fontSize: "x-small",
            color: "var(--primary-color)",
            marginTop: "4px",
          }}
        >
          Gestion Conférence
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginRight: "300px",
          gap: "10px",
        }}
      >
        <div className="date">{formattedDate}</div>
        <div className="time">{formattedTime}</div>
      </div>
    </header>
  );
}

export default Header;
