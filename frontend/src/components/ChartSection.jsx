import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#B35FFF", "#FFB833", "#33C1FF"];

const ChartSection = ({ dailyData, breakdownData }) => {
  
  // Daily Bar Chart Data Fix
  const barData = dailyData?.map((item) => ({
    date: item._id,
    count: item.count
  })) || [];

  // Pie Chart Data Fix
  const pieData = breakdownData?.map((item) => ({
    name: item._id,
    value: item.count,
  })) || [];

  return (
    <div style={{ display: "flex", marginTop: "40px", gap: "40px" }}>
      
      {/* DAILY BAR CHART */}
      <div style={{
        width: "55%",
        background: "#ffffff22",
        padding: "20px",
        borderRadius: "15px"
      }}>
        <h2>Daily Activity Trend</h2>

        {barData.length === 0 ? (
          <p style={{ color: "white" }}>No daily activity data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#999" />
              <XAxis dataKey="date" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Bar dataKey="count" fill="#b35fff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* PIE CHART BREAKDOWN */}
      <div style={{
        width: "45%",
        background: "#ffffff22",
        padding: "20px",
        borderRadius: "15px"
      }}>
        <h2>Activity Breakdown</h2>

        {pieData.length === 0 ? (
          <p style={{ color: "white" }}>No breakdown data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};

export default ChartSection;