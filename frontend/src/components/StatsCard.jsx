import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div style={{
      width: "200px",
      padding: "20px",
      background: "#f1f5f9",
      borderRadius: "10px",
      boxShadow: "0 0 10px #d1d5db"
    }}>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
};

export default StatsCard;