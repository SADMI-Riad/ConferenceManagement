import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../evalutations/Evaluation.css";

function EvaluationSoumission() {
  const { soumId, evaluatorId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [evaluation, setEvaluation] = useState({
    comments: "",
    score: 0,
    status: "ACCEPTED",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/submissions/${soumId}`
        );
        setSubmission(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement de la soumission");
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [soumId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/api/evaluations?submissionId=${soumId}&evaluatorId=${evaluatorId}`,
        evaluation
      );
      navigate("/conferences");
    } catch (err) {
      setError("Erreur lors de la soumission de l'évaluation");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!submission) return <div>Soumission non trouvée</div>;

  return (
    <div className="evaluation-container">
      <div className="submission-details">
        <h2>Évaluation de la Soumission</h2>
        <div className="submission-info">
          <h3>{submission.title}</h3>
          <p className="summary">{submission.summary}</p>
          <button
            className="btn-pdf"
            onClick={() =>
              window.open(
                `http://localhost:8080/api/submissions/${soumId}/pdf`,
                "_blank"
              )
            }
          >
            Voir le PDF
          </button>
        </div>
      </div>

      <form className="evaluation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Score (0-10):</label>
          <input
            type="number"
            name="score"
            min="0"
            max="10"
            value={evaluation.score}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Commentaire:</label>
          <textarea
            name="comments"
            value={evaluation.comments}
            onChange={handleChange}
            required
            rows="6"
          />
        </div>

        <div className="form-group">
          <label>Statut:</label>
          <select
            name="status"
            value={evaluation.status}
            onChange={handleChange}
            required
          >
            <option value="ACCEPTED">Accepté</option>
            <option value="REJECTED">Rejeté</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-submit">
            Soumettre l'évaluation
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() =>
              navigate("/ListeDesSoumisisonsAEvaluer/" + evaluatorId)
            }
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
export default EvaluationSoumission;
