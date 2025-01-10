import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Evaluation.css";

function EvaluationsList() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isAuthorEditor, setIsAuthorEditor] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [evalResponse, authorEditorResponse] = await Promise.all([
          axios.get(
            `http://localhost:8080/api/evaluations/submission/${submissionId}`
          ),
          axios.get(
            `http://localhost:8080/api/submissions/${submissionId}/isAuthorEditor/${userId}`
          ),
        ]);

        setEvaluations(evalResponse.data);
        setIsAuthorEditor(authorEditorResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    fetchData();
  }, [submissionId, userId]);

  const handleStatusUpdate = async (status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/submissions/${submissionId}/Status?status=${status}&userId=${userId}`
      );
      navigate("/conferences");
      setShowStatusModal(false);
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut");
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="evaluation-container">
      <div className="evaluation-header">
        <h1>Évaluations de la Soumission</h1>
      </div>

      <div className="evaluations-list">
        {evaluations.length === 0 ? (
          <p>Aucune évaluation pour cette soumission</p>
        ) : (
          evaluations.map((evaluation) => (
            <div key={evaluation.id} className="evaluation-card">
              <div className="evaluation-info">
                <div className="evaluation-score">
                  <span className="label">Score:</span>
                  <span className="value">{evaluation.score}/10</span>
                </div>

                <div className="evaluation-status">
                  <span className="label">Statut:</span>
                  <span className={`status ${evaluation.status.toLowerCase()}`}>
                    {evaluation.status === "ACCEPTED"
                      ? "Accepté"
                      : evaluation.status === "REJECTED"
                      ? "Rejeté"
                      : "En révision"}
                  </span>
                </div>

                <div className="evaluation-comments">
                  <span className="label">Commentaires:</span>
                  <p className="comments">{evaluation.comments}</p>
                </div>

                <div className="evaluation-meta">
                  <span className="evaluator">
                    Évaluateur ID: {evaluation.evaluatorId}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="div-des">
          {isAuthorEditor && evaluations.length > 0 ? (
            <button
              className="des-btn auto-btn"
              onClick={() => handleStatusUpdate("ACCEPTED")}
            >
              Calculer automatiquement
            </button>
          ) : (
            <button
              className="des-btn"
              onClick={() => setShowStatusModal(true)}
            >
              Mettre la décision finale
            </button>
          )}
        </div>
      </div>

      {showStatusModal && !isAuthorEditor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Choisir le statut final</h2>
            <div className="status-buttons">
              <button
                className="btn-accept"
                onClick={() => handleStatusUpdate("ACCEPTED")}
              >
                Accepter
              </button>
              <button
                className="btn-reject"
                onClick={() => handleStatusUpdate("REJECTED")}
              >
                Rejeter
              </button>
            </div>
            <button
              className="btn-cancel"
              onClick={() => setShowStatusModal(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EvaluationsList;
