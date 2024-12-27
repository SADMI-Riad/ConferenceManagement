import React from "react";
import EditeursDash from "../editeurs/EditeursDash";
import "./dashboard.css";
function Dashboard() {
  const stats = [
    {
      title: "Total des Conférences",
      value: 15,
      label: "Conférences",
    },
    {
      title: "Total des Évaluateurs",
      value: 30,
      label: "Évaluateurs",
    },
    {
      title: "Total des Éditeurs",
      value: 12,
      label: "Éditeurs",
    },
    {
      title: "Total des Auteurs",
      value: 50,
      label: "Auteurs",
    },
  ];

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
                <h2 style={{ color: "black" }}>{stat.title}:</h2>
                <p>
                  <span className="stat-value">{stat.value}</span>
                  <span style={{ color: "black", marginLeft: "5px" }}>
                    {stat.label}
                  </span>
                </p>
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
