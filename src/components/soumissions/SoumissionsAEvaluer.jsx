import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./soumissions.css";

function SoumissionsAEvaluer() {
  const navigate = useNavigate();
  const [soumissions] = useState([
    {
      id: 1,
      titre: "Intelligence Artificielle et Éthique",
      conference: "Conférence IA 2024",
      auteur: "Jean Dupont",
      dateDepot: "15 Janvier 2024",
    },
    {
      id: 2,
      titre: "Blockchain dans la Santé",
      conference: "Conférence Blockchain 2024",
      auteur: "Marie Martin",
      dateDepot: "20 Février 2024",
    },
    {
      id: 3,
      titre: "Cybersécurité et Cloud Computing",
      conference: "Conférence Cybersécurité 2024",
      auteur: "Pierre Dubois",
      dateDepot: "10 Mars 2024",
    },
  ]);

  const handleEvaluerSoumission = (soumissionId) => {
    navigate(`/evaluation/${soumissionId}`);
  };

  return (
    <div className="soumissions-container">
      <div className="soumissions-header">
        <h1>Soumissions à Évaluer</h1>
      </div>
      <div className="soumissions-liste">
        {soumissions.map((soumission) => (
          <div key={soumission.id} className="soumission-ligne">
            <div className="soumission-details">
              <span className="soumission-titre">{soumission.titre}</span>
              <span className="soumission-conference">
                {soumission.conference}
              </span>
              <span className="soumission-auteur">{soumission.auteur}</span>
              <span className="soumission-date">{soumission.dateDepot}</span>
            </div>
            <button
              className="btn-evaluer"
              onClick={() => handleEvaluerSoumission(soumission.id)}
            >
              Évaluer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SoumissionsAEvaluer;
