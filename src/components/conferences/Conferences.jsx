import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Conferences() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Tous");
  const [loading, setLoading] = useState(false);
  const [conferences,setConferences]=useState([]);
  const [error, setError] = useState(null);
  const imgUrl =
    "https://www.namic.org/wp-content/uploads/2024/10/mc_1072x600_v2-1-1200x674.jpg";

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/conferences",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setConferences(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors du chargement des conférences");
        setLoading(false);
        console.error("Erreur:", error);
      }
    };

    fetchConferences();
  }, []);

  const filterConferences = (status) => {
    setFilter(status);
  };

  const handleConferenceClick = (idConference) => {
    navigate(`/conference/${idConference}`);
  };
  // const handleEditConference = (idConference) => {
  //   navigate(`/edit-conference/${idConference}`);
  // };

  const filteredConferences =
    filter === "Tous"
      ? conferences
      : conferences.filter((conf) => conf.statut === filter);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="conferences-container">
      <h1
        style={{
          textAlign: "start",
          color: "var(--primary-color)",
        }}
      >
        Liste des Conférences
      </h1>
      <br />
      <div className="conference-filters">
        {["Tous", "Ouverte", "Fermée", "Annulée"].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? "active" : ""}`}
            onClick={() => filterConferences(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="conference-grid">
        {filteredConferences.map((conference) => (
          <div key={conference.id} className="conference-card">
            <img
              src={imgUrl}
              alt={conference.title}
              className="conference-image"
              loading="lazy"
            />
            {/* className={`statut-badge ${conference.statuts.toLowerCase()}`} */}
            {/* <div>
              {conference.statuts}
            </div> */}
            <div className="conference-info">
              <h2>{conference.title}</h2>
              <p>{conference.theme}</p>
              <p>
                <strong>Dates :</strong>{" "}
                {new Date(conference.startDate).toLocaleDateString()} -{" "}
                {new Date(conference.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Statut :</strong> {conference.status}
              </p>
              <button
                className="btn-details"
                onClick={() => handleConferenceClick(conference.id)}
                aria-label={`Détails de la conférence ${conference.title}`}
              >
                Voir les Détails
              </button>
              {/* {roles.includes("Éditeur") && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <button
                    onClick={() => handleEditConference(conference.id)}
                    className="btn-edit"
                  >
                    Éditer
                  </button>
                  <button className="btn-supp"> Supprimer</button>
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Conferences;
