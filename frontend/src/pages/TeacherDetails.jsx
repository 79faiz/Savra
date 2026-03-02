import React, { useEffect, useState } from "react";
import axios from "../api/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const TeacherDetails = ({ teacherId }) => {
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    if (!teacherId) return;

    axios.get(`/teacher/${teacherId}/stats`).then((res) => setStats(res.data));
    axios.get(`/teacher/${teacherId}/activities`).then((res) => setActivities(res.data));
    axios.get(`/teacher/${teacherId}/trends`).then((res) => setTrend(res.data));
  }, [teacherId]);

  const pieData = [
    { name: "Lessons", value: stats.lessonCount || 0 },
    { name: "Quizzes", value: stats.quizCount || 0 },
    { name: "Assessments", value: stats.assessmentCount || 0 },
  ];

  return (
    <div className="text-white">
      <h2 className="text-4xl font-semibold mb-6">Teacher Analytics</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <div className="glass-card">Activities: {stats.totalActivities}</div>
        <div className="glass-card">Lessons: {stats.lessonCount}</div>
        <div className="glass-card">Quizzes: {stats.quizCount}</div>
        <div className="glass-card">Assessments: {stats.assessmentCount}</div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-6">

        {/* Line Chart */}
        <div className="glass-card">
          <h3 className="text-xl mb-3">Activity Trend</h3>
          <LineChart width={350} height={250} data={trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#00c6ff" strokeWidth={3} />
          </LineChart>
        </div>

        {/* Pie Chart */}
        <div className="glass-card">
          <h3 className="text-xl mb-3">Activity Breakdown</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="glass-card">
          <h3 className="text-xl mb-3">Summary</h3>
          <BarChart width={350} height={250} data={pieData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="value" fill="#8855ff" />
          </BarChart>
        </div>

      </div>

      {/* Recent Activities Table */}
      <div className="glass-card mt-10 p-6">
        <h3 className="text-2xl mb-4">Recent Activities</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-300 border-b border-white/10">
              <th>Type</th>
              <th>Subject</th>
              <th>Grade</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((a, i) => (
              <tr key={i} className="border-b border-white/5">
                <td>{a.Activity_type}</td>
                <td>{a.Subject}</td>
                <td>{a.Grade}</td>
                <td>{new Date(a.Created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default TeacherDetails;