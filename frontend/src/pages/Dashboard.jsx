import React, { useEffect, useState } from "react";
import api from "../api/api";
import StatsCard from "../components/StatsCard";
import ChartSection from "../components/ChartSection";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [daily, setDaily] = useState([]);
  const [breakdown, setBreakdown] = useState([]);

  useEffect(() => {

    // DASHBOARD STATS
    api.get("/api/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log("Stats Error:", err));
  
    // DAILY BAR CHART
    api.get("/api/stats/daily")
      .then((res) => setDaily(res.data));
  
    // PIE CHART BREAKDOWN
    api.get("/api/stats/breakdown")
      .then((res) => setBreakdown(res.data));
  
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ margin: "20px" }}>
        <h1>Teacher Tracker Dashboard</h1>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <StatsCard title="Total Teachers" value={stats.totalTeachers} />
          <StatsCard title="Total Activities" value={stats.totalActivities} />
          <StatsCard title="Grades" value={stats.totalGrades} />
          <StatsCard title="Subjects" value={stats.totalSubjects} />
        </div>

        {/* BOTH CHARTS HERE */}
        <ChartSection dailyData={daily} breakdownData={breakdown} />
      </div>
    </div>
  );
};

export default Dashboard;