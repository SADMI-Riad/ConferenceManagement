import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../connection/Login";
import axios from "axios";

function Conferences() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [filter] = useState("Tous");
  const [loading, setLoading] = useState(false);
  const [conferences, setConferences] = useState([]);
  const [myConferences, setMyConferences] = useState([]);
  const [showMyConferences, setShowMyConferences] = useState(false);
  const [error, setError] = useState(null);

  const imgUrl =
    "https://www.namic.org/wp-content/uploads/2024/10/mc_1072x600_v2-1-1200x674.jpg";

  useEffect(() => {
    const fetchConferences = async () => {
      setLoading(true);
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
      } catch (error) {
        setError("Erreur lors du chargement des conférences");
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  const fetchMyConferences = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/conferences/my-conferences?userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMyConferences(response.data);
      setShowMyConferences(true);
    } catch (error) {
      setError("Erreur lors du chargement de vos conférences");
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowAllConferences = () => {
    setShowMyConferences(false);
  };

  const handleConferenceClick = (idConference) => {
    navigate(`/conference/${idConference}`);
  };

  const getFilteredConferences = () => {
    const confsToFilter = showMyConferences ? myConferences : conferences;
    return filter === "Tous"
      ? confsToFilter
      : confsToFilter.filter((conf) => conf.status === filter);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="conferences-container">
      <h1 style={{ textAlign: "start", color: "var(--primary-color)" }}>
        Liste des Conférences
      </h1>
      <br />
      <div className="conference-filters">
        <button
          className={`filter-btn ${!showMyConferences ? "active" : ""}`}
          onClick={handleShowAllConferences}
        >
          Toutes les conférences
        </button>
        <button
          className={`filter-btn ${showMyConferences ? "active" : ""}`}
          onClick={fetchMyConferences}
        >
          Mes conférences
        </button>
      </div>

      <div className="conference-grid">
        {getFilteredConferences().map((conference) => (
          <div key={conference.id} className="conference-card">
            <img
              src={imgUrl}
              alt={conference.title}
              className="conference-image"
              loading="lazy"
            />
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Conferences;
