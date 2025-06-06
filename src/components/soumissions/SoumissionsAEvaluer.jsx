import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./soumissions.css";

function SoumissionsAEvaluer() {
  const navigate = useNavigate();
  const { evaluatorId, conferenceId } = useParams();
  const [soumissions, setSoumissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSoumissions = async () => {
      console.log(evaluatorId);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/submission-evaluators/${conferenceId}/${evaluatorId}`
        );
        setSoumissions(response.data);
        console.log(evaluatorId);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des soumissions");
        setLoading(false);
      }
    };

    fetchSoumissions();
  }, [conferenceId, evaluatorId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="soumissions-container">
      <div className="soumissions-header">
        <h1>Soumissions à Évaluer</h1>
      </div>
      <div className="soumissions-liste">
        {soumissions.length === 0 ? (
          <p>Aucune soumission à évaluer</p>
        ) : (
          soumissions.map((soumission) => (
            <div key={soumission.id} className="soumission-ligne">
              <div className="soumission-details">
                <span className="soumission-titre">{soumission.title}</span>
                <span className="soumission-summary">{soumission.summary}</span>
                <span className="soumission-auteur">
                  Auteur ID: {soumission.authorId}
                </span>
                <span className="soumission-conference">
                  Conference ID: {soumission.conferenceId}
                </span>
              </div>
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
                <button
                  className="btn-evaluer"
                  onClick={() =>
                    navigate(`/evaluation/${soumission.id}/${evaluatorId}`)
                  }
                >
                  Évaluer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SoumissionsAEvaluer;
