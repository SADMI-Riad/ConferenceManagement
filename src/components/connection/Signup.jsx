import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

function Signup() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      errors.username = "Le nom d'utilisateur est requis.";
    }

    if (!fullName.trim()) {
      errors.fullName = "Le nom complet est requis.";
    }

    if (!email) {
      errors.email = "L'email est requis.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Veuillez entrer un email valide.";
    }

    if (!password) {
      errors.password = "Le mot de passe est requis.";
    } else if (password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    return errors;
  };

  const handleCreateAccountClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate("/login");
    }, 650);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});
    setLoading(true);

    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const userData = {
          username: username,
          fullName: fullName,
          email: email,
          password: password
        };

        const response = await axios.post(
          'http://localhost:8080/api/auth/register',
          userData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === 200) {
          setSuccessMessage("Inscription réussie !");
          setUsername("");
          setFullName("");
          setEmail("");
          setPassword("");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message || "Une erreur est survenue lors de l'inscription.";
          setErrors({
            backend: errorMessage
          });
        } else if (error.request) {
          setErrors({
            backend: "Impossible de contacter le serveur. Vérifiez votre connexion."
          });
        } else {
          setErrors({
            backend: "Erreur lors de la préparation de la requête."
          });
        }
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-box" onSubmit={handleSubmit} noValidate>
        <h1>Créer un Compte</h1>

        {errors.backend && (
          <div className="error-message backend-error">{errors.backend}</div>
        )}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            placeholder="Votre nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={errors.username ? "input-error" : ""}
            required
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Nom Complet</label>
          <input
            type="text"
            id="fullName"
            placeholder="Votre nom complet"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={errors.fullName ? "input-error" : ""}
            required
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "input-error" : ""}
            required
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de Passe</label>
          <input
            type="password"
            id="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "input-error" : ""}
            required
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Inscription en cours..." : "Créer un Compte"}
        </button>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <p className={`no_account_btn ${isAnimating ? "animate-link" : ""}`}
            style={{ display: "flex", alignItems: "center", gap: "7px" }}
            onClick={() => navigate("/")}>
            <FaArrowLeft />
            go to main
          </p>
          <p className={`no_account_btn ${isAnimating ? "animate-link" : ""}`}
            onClick={handleCreateAccountClick}>
            Vous avez un compte, connectez-vous !
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
