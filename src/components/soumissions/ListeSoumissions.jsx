import React, { useState, useEffect } from "react";
import "./soumissions.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function ListeSoumissions() {
  const { idConference } = useParams();
  const [soumissions, setSoumissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSoumissions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/submissions/conference/${idConference}`
        );
        setSoumissions(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des soumissions");
        setLoading(false);
      }
    };

    fetchSoumissions();
  }, [idConference]);

  const handleSuppression = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/submissions/${id}`);
      setSoumissions(soumissions.filter((soumission) => soumission.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression");
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="soumissions-container">
      <div className="soumissions-header">
        <h1>Soumissions de la Conférence</h1>
      </div>

      <div className="soumissions-liste">
        {soumissions.length === 0 ? (
          <p>Aucune soumission trouvée pour cette conférence</p>
        ) : (
          soumissions.map((soumission) => (
            <div key={soumission.id} className="soumission-ligne">
              <span className="soumission-titre">{soumission.title}</span>
              <span className="soumission-auteur">
                Auteur ID: {soumission.authorId}
              </span>
              <div className="soumission-actions">
                <button
                  className="btn-telecharger"
                  onClick={() => window.open(
                    `http://localhost:8080/api/submissions/${soumission.id}/pdf`,
                    '_blank'
                  )}
                >
                  Télécharger PDF
                </button>
                <button
                  className="btn-supprimer"
                  onClick={() => handleSuppression(soumission.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ListeSoumissions;
