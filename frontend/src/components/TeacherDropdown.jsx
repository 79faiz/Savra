import React, { useEffect, useState } from "react";
import axios from "../api/api";

const TeacherDropdown = ({ onSelect }) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get("/api/teachers/list")
      .then(res => setTeachers(res.data))
      .catch(err => console.error("Dropdown Error:", err));
  }, []);

  return (
    <select
      className="px-4 py-2 rounded-xl text-white bg-purple-500 hover:bg-purple-600 cursor-pointer"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Select Teacher</option>

      {teachers.map((t) => (
        <option key={t.Teacher_id} value={t.Teacher_id}>
          {t.Teacher_name}
        </option>
      ))}
    </select>
  );
};

export default TeacherDropdown;