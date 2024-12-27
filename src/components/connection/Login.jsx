import React, { useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./connection.css";
import { FaArrowLeft } from "react-icons/fa";
export const AuthContext = createContext({
  connected: localStorage.getItem("user") !== null,
  userId: JSON.parse(localStorage.getItem("user"))?.id || null,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "L'email est requis.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Veuillez entrer un email valide.";
    }

    if (!password) {
      errors.password = "Le mot de passe est requis.";
    }

    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setLoading(true);
  
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            email: email,
            password: password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        const userData = response.data;
        localStorage.setItem("user", JSON.stringify({
          id: userData.id,
          connected: true
        }));
  
        setSuccessMessage("Connexion réussie!");
        
        const from = location.state?.from || "/";
        navigate(from, { replace: true });
        window.location.reload();
  
      } catch (error) {
        if (error.response) {
          setErrors({
            backend: "Email ou mot de passe incorrect"
          });
        } else {
          setErrors({
            backend: "Erreur de connexion au serveur"
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
  

  const handleCreateAccountClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate("/signup");
    }, 650);
  };
  return (
    <AuthContext.Provider
      value={{
        connected:
          localStorage.getItem("user") !== null &&
          JSON.parse(localStorage.getItem("user"))?.connected === true,
        userId: JSON.parse(localStorage.getItem("user"))?.id || null,
      }}
    >
      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit} noValidate>
          <h1>Se Connecter</h1>
          {errors.backend && (
            <div className="error-message backend-error">{errors.backend}</div>
          )}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
              aria-describedby="emailError"
              required
            />
            {errors.email && (
              <span id="emailError" className="error-message">
                {errors.email}
              </span>
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
              aria-describedby="passwordError"
              required
            />
            {errors.password && (
              <span id="passwordError" className="error-message">
                {errors.password}
              </span>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Connexion en cours..." : "Se Connecter"}
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              className={`no_account_btn ${isAnimating ? "animate-link" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "7px" }}
              onClick={() => navigate("/")}
            >
              <FaArrowLeft />
              go to main
            </p>
            <p
              className={`no_account_btn ${isAnimating ? "animate-link" : ""}`}
              onClick={handleCreateAccountClick}
            >
              Vous n'avez pas de compte, créez un !
            </p>
          </div>
        </form>
      </div>
    </AuthContext.Provider>
  );
}

export default Login;
