import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import TeacherAnalytics from "./pages/TeacherAnalytics";
import Navbar from "./components/Navbar";

function App() {
  const [selectedTeacher, setSelectedTeacher] = useState("");

  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-900 min-h-screen">

      {/* Jahan se teacher select hoga */}
      <Navbar onTeacherSelect={setSelectedTeacher} />

      <div className="pt-24 px-6">
        {selectedTeacher ? (
          <TeacherAnalytics teacherId={selectedTeacher} />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}

export default App;