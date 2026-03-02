import React from "react";

const Sidebar = () => {
  return (
    <div style={{
      width: "220px",
      background: "#1e293b",
      height: "100vh",
      color: "white",
      padding: "20px"
    }}>
      <h2>Savra</h2>
      <ul style={{ marginTop: "40px", listStyle: "none", padding: 0 }}>
        <li>Dashboard</li>
        <li>Teachers</li>
        <li>Performance</li>
      </ul>
    </div>
  );
};

export default Sidebar;