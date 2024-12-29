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
  const [userRoles, setUserRoles] = useState([]);
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

    const fetchUserRoles = async () => {
      if (connected && userId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/conferences/${idConference}/${userId}`
          );
          setUserRoles(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des rôles:", error);
        }
      }
    };
    fetchConference();
    fetchUserRoles();
  }, [idConference, userId, connected]);
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
  const handleConferenceDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/conferences/${idConference}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        navigate("/conferences");
      }
    } catch (error) {
      setError("Erreur lors de la suppression de la conférence");
      console.error("Erreur:", error);
    }
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
      window.location.reload();
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
            {userRoles.includes("AUTHOR") && (
              <button className="btn-register" onClick={handleRegisterClick}>
                S'inscrire
              </button>
            )}
            {(!userRoles.includes("AUTHOR") ||
              !userRoles.includes("EVALUATOR")) && (
              <button
                className="btn-register"
                onClick={() => setShowRoleModal(true)}
              >
                Choisir Rôles pour cette conference
              </button>
            )}
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
            {userRoles.includes("EVALUATOR") && (
              <button className="btn-register">
                Voir les soumissions à Évaluer
              </button>
            )}
            {userRoles.includes("EDITOR") && (
              <div className="editor-actions">
                <button
                  className="btn-register"
                  onClick={handleListeSoumissions}
                >
                  Voir les Soumessions
                </button>
                <button
                  className="btn-register btn-delete"
                  onClick={handleConferenceDelete}
                >
                  Supprimer
                </button>
              </div>
            )}
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
