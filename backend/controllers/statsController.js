const Teacher = require("../models/Teacher");

exports.getStats = async (req, res) => {
  try {
    const teachers = await Teacher.aggregate([
      { $group: { _id: "$Teacher_id" } }
    ]);

    const totalTeachers = teachers.length;

    const totalActivities = await Teacher.countDocuments();

    const grades = await Teacher.distinct("Grade");
    const subjects = await Teacher.distinct("Subject");

    res.json({
      totalTeachers,
      totalActivities,
      totalGrades: grades.length,
      totalSubjects: subjects.length
    });
  } catch (err) {
    res.status(500).json({ error: "Stats fetch error" });
  }
};