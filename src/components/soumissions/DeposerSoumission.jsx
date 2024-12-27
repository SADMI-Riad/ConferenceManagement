import React, { useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../connection/Login";
import "./soumissions.css";

function DeposerSoumission() {
  const navigate = useNavigate();
  const { idConference } = useParams();
  const { userId } = useContext(AuthContext);
  const [soumission, setSoumission] = useState({
    title: "",
    summary: "",
    fichierPdf: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoumission((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSoumission((prev) => ({
      ...prev,
      fichierPdf: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", soumission.title);
    formData.append("summary", soumission.summary);
    formData.append("file", soumission.fichierPdf);
    formData.append("conferenceId", idConference);
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/submissions",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setSoumission({
          title: "",
          summary: "",
          fichierPdf: null
        });

        setTimeout(() => {
          navigate("/conferences");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la soumission");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="creation-conference-container">
      <div className="conference-creation-header">
        <h1>Soumettre un Article</h1>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">Article soumis avec succès !</div>
      )}

      <form onSubmit={handleSubmit} className="conference-form">
        <div className="form-group">
          <label htmlFor="title">Titre de l'Article</label>
          <input
            type="text"
            id="title"
            name="title"
            value={soumission.title}
            onChange={handleChange}
            placeholder="Entrez le titre de votre article"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary">Résumé</label>
          <textarea
            id="summary"
            name="summary"
            value={soumission.summary}
            onChange={handleChange}
            placeholder="Résumez votre article en quelques lignes"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fichierPdf">Document PDF</label>
          <input
            type="file"
            id="fichierPdf"
            name="fichierPdf"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            className="btn-create-conference"
            disabled={loading}
          >
            {loading ? "Soumission en cours..." : "Soumettre l'Article"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeposerSoumission;
