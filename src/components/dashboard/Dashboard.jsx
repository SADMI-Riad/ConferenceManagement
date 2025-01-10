import React, { useEffect, useState } from "react";
import EditeursDash from "../editeurs/EditeursDash";
import "./dashboard.css";
import axios from "axios";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [stat, setStat] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchstats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/statistics",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setStat(response.data);
      } catch (error) {
        setError("Erreur lors du chargement des stats");
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchstats();
  }, []);
  const stats = [
    {
      value: stat.totalConferences,
      label: "Conférences",
    },
    {
      value: stat.totalEvaluators,
      label: "Évaluateurs",
    },
    {
      value: stat.totalEditors,
      label: "Éditeurs",
    },
    {
      value: stat.totalAuthors,
      label: "Auteurs",
    },
  ];
  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;
  return (
    <div>
      <div className="dashboard-container">
        <h1 className="dashboard_H1">Dashboard</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="dashboard-grid">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="dashboard-card"
                style={{ backgroundColor: stat.color }}
              >
                <h2 style={{ color: "white" }}>
                  Total <span className="stat-number">{stat.value}</span>{" "}
                  <span className="stat-label">{stat.label}</span>
                </h2>
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundColor: "white",
              flex: "0 0 35%",
              marginLeft: "45px",
              marginRight: "45px",
              borderRadius: "17px",
            }}
          >
            <EditeursDash />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
