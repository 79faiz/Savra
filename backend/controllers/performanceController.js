const Teacher = require("../models/Teacher");

// WEEKLY PERFORMANCE
exports.getWeeklyPerformance = async (req, res) => {
  try {
    const data = await Teacher.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$Created_at" },
            week: { $week: "$Created_at" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.week": 1 }
      },
      {
        $project: {
          _id: 0,
          week: { $concat: ["Week ", { $toString: "$_id.week" }] },
          count: 1
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Weekly Performance Error" });
  }
};