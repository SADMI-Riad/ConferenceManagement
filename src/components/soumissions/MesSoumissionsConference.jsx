import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./soumissions.css";

function MesSoumissionsConference() {
  const { authorId, conferenceId } = useParams();
  const [soumissions, setSoumissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSoumissions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/submissions/author/${authorId}/conference/${conferenceId}`
        );
        setSoumissions(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des soumissions");
        setLoading(false);
      }
    };

    fetchSoumissions();
  }, [authorId, conferenceId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="soumissions-container">
      <div className="soumissions-header">
        <h1>Mes Soumissions</h1>
      </div>

      <div className="soumissions-liste">
        {soumissions.length === 0 ? (
          <p>Aucune soumission trouvée</p>
        ) : (
          soumissions.map((soumission) => (
            <div key={soumission.id} className="soumission-ligne">
              <div className="soumission-details">
                <span className="soumission-titre">{soumission.title}</span>
                <span className="soumission-summary">{soumission.summary}</span>
              </div>
              <span
                className={`soumission-statut statut-${soumission.resultStatus?.toLowerCase()}`}
              >
                {soumission.resultStatus === "ACCEPTED"
                  ? "Accepté"
                  : soumission.resultStatus === "REJECTED"
                  ? "Rejeté"
                  : soumission.resultStatus === "UNDER_REVISION"
                  ? "En révision"
                  : soumission.resultStatus === "SUBMITTED"
                  ? "Soumis"
                  : "En attente"}
              </span>
              <div className="soumission-actions">
                <button
                  className="btn-telecharger"
                  onClick={() =>
                    window.open(
                      `http://localhost:8080/api/submissions/${soumission.id}/pdf`,
                      "_blank"
                    )
                  }
                >
                  Télécharger PDF
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MesSoumissionsConference;
