import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Evaluation.css";

function EvaluationsList() {
  const { submissionId } = useParams();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isAuthorEditor, setIsAuthorEditor] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const handleStatusUpdate = useCallback(
    async (status) => {
      try {
        await axios.put(
          `http://localhost:8080/api/submissions/${submissionId}/Status?status=${status}`
        );
        setShowStatusModal(false);
      } catch (err) {
        setError("Erreur lors de la mise à jour du statut");
      }
    },
    [submissionId]
  );

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

        if (authorEditorResponse.data && evalResponse.data.length > 0) {
          const scores = evalResponse.data.map(
            (evaluation) => evaluation.score
          );
          const average = scores.reduce((a, b) => a + b, 0) / scores.length;
          const finalStatus = average >= 5 ? "ACCEPTED" : "REJECTED";

          await handleStatusUpdate(finalStatus);
        }

        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    fetchData();
  }, [submissionId, userId, handleStatusUpdate]);

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
        {!isAuthorEditor && (
          <div className="div-des">
            <button
              className="des-btn"
              onClick={() => setShowStatusModal(true)}
            >
              Mettre la décision finale
            </button>
          </div>
        )}
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
