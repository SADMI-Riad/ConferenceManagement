import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../connection/Login";
import "./navbar.css";
function Navbar() {
  const { connected, Nom, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <p
          style={{
            fontSize: "xx-small",
            opacity: "50%",
            color: "var(--secondary-color)",
            marginLeft: "20px",
            marginTop: "10px",
          }}
        >
          Menu
        </p>
        <ul className="navbar-links">
          <li onClick={() => navigate("/conferences")}>Voir les Conférences</li>
          {connected ? (
            <div>
              <li onClick={() => navigate("/creationConference")}>
                Créer une Conference
              </li>
              <br />
              <li onClick={handleLogout}>Se deconnecter</li>
              <br />
              <li>
                user : {Nom} L'ID : {userId}
              </li>
            </div>
          ) : (
            <li onClick={() => navigate("/login")}>Se connecter</li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
