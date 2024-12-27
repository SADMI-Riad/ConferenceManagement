import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EvaluationSoumission() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  
  const [soumission, setSoumission] = useState({
    titre: '',
    resume: '',
    fichierPdf: null
  });

  const [evaluation, setEvaluation] = useState({
    note: 0,
    commentaires: '',
    statut: 'En révision'
  });

  useEffect(() => {
    // Charger les détails de la soumission
    const fetchSoumissionDetails = async () => {
      try {
        const response = await axios.get(`/submissions/${submissionId}`);
        setSoumission(response.data);
      } catch (error) {
        console.error("Erreur de chargement", error);
      }
    };

    fetchSoumissionDetails();
  }, [submissionId]);

  const handleEvaluationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/evaluations', {
        submission_id: submissionId,
        ...evaluation
      });
      navigate('/soumissions-a-evaluer');
    } catch (error) {
      console.error("Erreur d'évaluation", error);
    }
  };

  return (
    <div className="evaluation-container">
      <h1>Évaluation de Soumission</h1>
      
      <div className="soumission-details">
        <h2>{soumission.titre}</h2>
        <p>{soumission.resume}</p>
        
        <a 
          href={soumission.fichierPdf} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-details"
        >
          Voir le PDF
        </a>
      </div>

      <form onSubmit={handleEvaluationSubmit} className="evaluation-form">
        <div className="form-group">
          <label>Note (1-10)</label>
          <input 
            type="number" 
            min="1" 
            max="10"
            value={evaluation.note}
            onChange={(e) => setEvaluation({
              ...evaluation, 
              note: parseInt(e.target.value)
            })}
            required 
          />
        </div>

        <div className="form-group">
          <label>Commentaires</label>
          <textarea
            value={evaluation.commentaires}
            onChange={(e) => setEvaluation({
              ...evaluation, 
              commentaires: e.target.value
            })}
            required
          />
        </div>

        <div className="form-group">
          <label>Statut</label>
          <select
            value={evaluation.statut}
            onChange={(e) => setEvaluation({
              ...evaluation, 
              statut: e.target.value
            })}
          >
            <option value="En révision">En Révision</option>
            <option value="Acceptée">Acceptée</option>
            <option value="Rejetée">Rejetée</option>
          </select>
        </div>

        <button type="submit" className="btn-create-conference">
          Soumettre l'Évaluation
        </button>
      </form>
    </div>
  );
}

export default EvaluationSoumission;
