import React, { useEffect, useState } from "react";
import axios from "../api/api";

const Navbar = ({ onTeacherSelect }) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get("/api/teachers/list").then((res) => setTeachers(res.data));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full px-8 py-4 flex justify-between items-center bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg z-50">
      
      <h1 className="text-3xl font-bold text-white drop-shadow-sm">Savra Dashboard</h1>

      <select
        onChange={(e) => onTeacherSelect(e.target.value)}
        className="px-4 py-2 rounded-xl bg-white/20 text-white font-medium backdrop-blur-xl border border-white/30 shadow-inner outline-none"
      >
        <option value="">Select Teacher</option>

        {teachers.map((t) => (
          <option key={t.Teacher_id} value={t.Teacher_id}>
            {t.Teacher_name}
          </option>
        ))}
      </select>

    </div>
  );
};

export default Navbar;