import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../connection/Login";

function CreationConference() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [conference, setConference] = useState({
    title: "",
    theme: "",
    startDate: "",
    endDate: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConference((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/conferences?userId=${userId}`,
        conference,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/conferences');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la création de la conférence");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="creation-conference-container">
      <div className="conference-creation-header">
        <h1>Créer une Nouvelle Conférence</h1>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">Conférence créée avec succès !</div>
      )}

      <form onSubmit={handleSubmit} className="conference-form">
        <div className="form-group">
          <label htmlFor="title">Nom de la Conférence</label>
          <input
            type="text"
            id="title"
            name="title"
            value={conference.title}
            onChange={handleChange}
            placeholder="Entrez le nom de la conférence"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="theme">Thème</label>
          <textarea
            id="theme"
            name="theme"
            value={conference.theme}
            onChange={handleChange}
            placeholder="Décrivez le thème de la conférence"
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Date de Début</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={conference.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Date de Fin</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={conference.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            className="btn-create-conference"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer la Conférence"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreationConference;
