import React, { useState, useEffect } from "react";
import "./soumissions.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ListeSoumissions() {
  const { idConference } = useParams();
  const navigate = useNavigate();
  const [soumissions, setSoumissions] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [showEvaluatorModal, setShowEvaluatorModal] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(-1);
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

  const fetchEvaluators = async (conferenceId, submissionId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/conferences/Evaluators/${conferenceId}/${submissionId}`
      );
      setEvaluators(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des évaluateurs");
    }
  };

  const handleAssignEvaluator = async (evaluatorId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/submission-evaluators/assign?submissionId=${selectedSubmissionId}&evaluatorId=${evaluatorId}`
      );

      await fetchEvaluators(idConference, selectedSubmissionId);

      // const submissionsResponse = await axios.get(
      //   `http://localhost:8080/api/submissions/conference/${idConference}`
      // );
      // setSoumissions(submissionsResponse.data);

      setShowEvaluatorModal(false);
      setSelectedSubmissionId(-1);
    } catch (err) {
      setError("Erreur lors de l'assignation de l'évaluateur");
    }
  };

  const openEvaluatorModal = async (submissionId) => {
    setEvaluators([]);
    setSelectedSubmissionId(submissionId);
    await fetchEvaluators(idConference, submissionId);
    setShowEvaluatorModal(true);
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
                  onClick={() => openEvaluatorModal(soumission.id)}
                >
                  Mettre à évaluer
                </button>
                <button
                  className="btn-telecharger"
                  onClick={() =>
                    navigate(`/liste_des_evaluations/${soumission.id}`)
                  }
                >
                  Regarder les évaluations
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showEvaluatorModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Choisir un Évaluateur</h2>
            <div className="evaluators-list">
              {evaluators.map((evaluator) => (
                <button
                  key={evaluator.id}
                  className="evaluator-btn"
                  onClick={() => handleAssignEvaluator(evaluator.id)}
                >
                  {evaluator.fullName}
                </button>
              ))}
            </div>
            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowEvaluatorModal(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListeSoumissions;
