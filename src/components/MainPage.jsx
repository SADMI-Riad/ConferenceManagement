import React from "react";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
function MainPage() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            flex: "0 0 20%",
            backgroundColor: "white",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar />
        </div>
        <div
          style={{
            flex: "1",
            overflowY: "auto",
            height: "100vh",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
