const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");

// MAIN STATS API (Dashboard Cards)
router.get("/stats", async (req, res) => {
  try {
    const totalTeachers = await Teacher.distinct("Teacher_id");
    const totalActivities = await Teacher.countDocuments();
    const totalGrades = await Teacher.distinct("Grade");
    const totalSubjects = await Teacher.distinct("Subject");

    res.json({
      totalTeachers: totalTeachers.length,
      totalActivities,
      totalGrades: totalGrades.length,
      totalSubjects: totalSubjects.length
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DAILY STATS FOR BAR CHART
router.get("/stats/daily", async (req, res) => {
    try {
      const result = await Teacher.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$Created_at" }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.json(result);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// PIE CHART BREAKDOWN
router.get("/stats/breakdown", async (req, res) => {
  const data = await Teacher.aggregate([
    { $group: { _id: "$Activity_type", count: { $sum: 1 } } },
  ]);

  res.json(data);
});

module.exports = router;