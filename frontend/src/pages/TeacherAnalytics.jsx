import React, { useState, useEffect } from "react";
import api from "../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#A855F7", "#3B82F6", "#10B981"]; // purple, blue, green

const TeacherAnalytics = ({ teacherId }) => {
  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);
  const [trend, setTrend] = useState([]);

  const normalizeType = (type) => {
    if (!type) return "";
    type = type.toLowerCase();

    if (type.includes("lesson")) return "Lesson";
    if (type.includes("quiz")) return "Quiz";
    if (type.includes("question")) return "Assessment";

    return type;
  };

  // Debug
  useEffect(() => {
    console.log("Received TeacherId:", teacherId);
  }, [teacherId]);

  useEffect(() => {
    if (!teacherId) return;

    // 📌 Get All Activities
    api
      .get(`/api/teacher/${teacherId}/activities`)
      .then((res) => {
        const data = res.data;

        // Normalize
        const normalized = data.map((a) => ({
          ...a,
          Activity_type: normalizeType(a.Activity_type),
        }));

        // Counts
        const lessonCount = normalized.filter((a) => a.Activity_type === "Lesson").length;
        const quizCount = normalized.filter((a) => a.Activity_type === "Quiz").length;
        const assessmentCount = normalized.filter((a) => a.Activity_type === "Assessment").length;

        setStats({
          totalActivities: normalized.length,
          lessonCount,
          quizCount,
          assessmentCount,
        });

        // Recent 5
        setRecent(normalized.slice(0, 5));
      });

    // 📌 Get Trend Data
    api.get(`/api/teacher/${teacherId}/trends`).then((res) => {
      setTrend(res.data);
    });
  }, [teacherId]);

  // Pie Chart Data
  const pieData = [
    { name: "Lessons", value: stats.lessonCount || 0 },
    { name: "Quizzes", value: stats.quizCount || 0 },
    { name: "Assessments", value: stats.assessmentCount || 0 },
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-white text-4xl font-bold mb-6">Teacher Analytics</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-purple-600 p-6 rounded-xl">Activities: {stats.totalActivities}</div>
        <div className="bg-purple-600 p-6 rounded-xl">Lessons: {stats.lessonCount}</div>
        <div className="bg-purple-600 p-6 rounded-xl">Quizzes: {stats.quizCount}</div>
        <div className="bg-purple-600 p-6 rounded-xl">Assessments: {stats.assessmentCount}</div>
      </div>

      {/* Charts Section */}
      <div className="mt-10 grid grid-cols-2 gap-6">

        {/* 📌 Line Chart */}
        <div className="bg-purple-700 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Activity Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#A855F7" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 📌 Pie Chart */}
        <div className="bg-purple-700 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Activity Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-10 bg-purple-700 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-3">Recent Activities</h2>
        {recent.length === 0 ? (
          <p>No recent activity found.</p>
        ) : (
          <ul>
            {recent.map((item, i) => (
              <li key={i} className="border-b border-purple-400 py-2">
                {item.Activity_type} — {new Date(item.Created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeacherAnalytics;