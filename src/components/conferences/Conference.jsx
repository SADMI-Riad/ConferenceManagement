import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../connection/Login";
import axios from "axios";
import "./Conference.css";

function Conference() {
  const { idConference } = useParams();
  const navigate = useNavigate();
  const { connected, userId } = useContext(AuthContext);
  const [conference, setConference] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [error, setError] = useState(null);
  const ref = `/conference/${idConference}`;

  useEffect(() => {
    const fetchConference = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/conferences/${idConference}`
        );
        setConference(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors du chargement de la conférence");
        setLoading(false);
      }
    };

    fetchConference();
  }, [idConference]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!conference)
    return <div className="no-conference">Conférence non trouvée</div>;

  const handleRegisterClick = () => {
    navigate(`/posersoumission/${idConference}`);
  };
  const handleListeSoumissions = () => {
    navigate(`/liste_soumissions/${idConference}`);
  };
  const handleRoleAssignment = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/conferences/${idConference}/roles`,
        null,
        {
          params: {
            role: selectedRole,
            userId: userId,
          },
        }
      );
      setShowRoleModal(false);
    } catch (error) {
      setError("Erreur lors de l'attribution du rôle");
    }
  };

  return (
    <div className="conference-details-container1">
      <div className="conference-header">
        <h1>{conference.title}</h1>
        <span
          className={`conference-status ${conference.status?.toLowerCase()}`}
        >
          {conference.status}
        </span>
      </div>

      <div className="conference-description">
        <p>{conference.theme}</p>
        <div className="conference-dates">
          <strong>Dates :</strong>{" "}
          {new Date(conference.startDate).toLocaleDateString()} -{" "}
          {new Date(conference.endDate).toLocaleDateString()}
        </div>
      </div>

      <div className="conference-actions">
        <button className="btn-back" onClick={() => navigate("/conferences")}>
          Retour à la Liste
        </button>
        {connected ? (
          <div className="btn-div">
            <button className="btn-register" onClick={handleRegisterClick}>
              S'inscrire
            </button>
            <button
              className="btn-register"
              onClick={() => setShowRoleModal(true)}
            >
              Choisir Rôles pour cette conference
            </button>

            {showRoleModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Choisir un Rôle</h2>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="role-select"
                  >
                    <option value="">Sélectionner un rôle</option>
                    <option value="AUTHOR">Auteur</option>
                    <option value="EVALUATOR">Évaluateur</option>
                  </select>
                  <div className="modal-buttons">
                    <button
                      onClick={handleRoleAssignment}
                      disabled={!selectedRole || loading}
                    >
                      Confirmer
                    </button>
                    <button onClick={() => setShowRoleModal(false)}>
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button className="btn-register">Voir les Evaluations</button>
            <button className="btn-register" onClick={handleListeSoumissions}>
              Voir les Soumessions à evaluer
            </button>
          </div>
        ) : (
          <button
            className="btn-back"
            onClick={() =>
              navigate("/login", {
                state: { from: ref },
              })
            }
          >
            Se connecter
          </button>
        )}
      </div>
    </div>
  );
}

export default Conference;
