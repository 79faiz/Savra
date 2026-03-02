const Teacher = require("../models/Teacher");

// ---------------------------------------------
// Already existing in your project
// ---------------------------------------------
exports.getTeachers = async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
};

// ---------------------------------------------
// NEW API 1: Teacher List for Dropdown
// ---------------------------------------------
exports.getTeacherList = async (req, res) => {
    const teachers = await Teacher.aggregate([
      {
        $group: {
          _id: "$Teacher_id",
          Teacher_name: { $first: "$Teacher_name" }
        }
      },
      {
        $project: {
          _id: 0,
          Teacher_id: "$_id",
          Teacher_name: 1
        }
      }
    ]);
  
    res.json(teachers);
  };

// ---------------------------------------------
// NEW API 2: Teacher Stats (Lessons, Quizzes, Assessments)
// ---------------------------------------------
exports.getTeacherStats = async (req, res) => {
    const teacherId = req.params.id;
  
    const activities = await Teacher.find({ Teacher_id: teacherId });
  
    // Normalize Activity Types
    const normalize = (type) => {
      if (!type) return "";
  
      type = type.toLowerCase();
  
      if (type.includes("lesson")) return "Lesson";                // Lesson Plan  
      if (type.includes("quiz")) return "Quiz";                    // Quiz
      if (type.includes("question")) return "Assessment";          // Question Paper  
  
      return type;
    };
  
    const normalized = activities.map(a => ({
      ...a._doc,
      Activity_type: normalize(a.Activity_type)
    }));
  
    const totalActivities = normalized.length;
    const lessonCount = normalized.filter(a => a.Activity_type === "Lesson").length;
    const quizCount = normalized.filter(a => a.Activity_type === "Quiz").length;
    const assessmentCount = normalized.filter(a => a.Activity_type === "Assessment").length;
  
    res.json({
      totalActivities,
      lessonCount,
      quizCount,
      assessmentCount
    });
  };

// ---------------------------------------------
// NEW API 3: Teacher Activities (Recent 10 records)
// ---------------------------------------------
exports.getTeacherActivities = async (req, res) => {
  const teacherId = req.params.id;

  const data = await Teacher.find({ Teacher_id: teacherId })
    .sort({ Created_at: -1 })
    .limit(10);

  res.json(data);
};

// ---------------------------------------------
// NEW API 4: Teacher Trend (Daily Activity Chart)
// ---------------------------------------------
exports.getTeacherTrends = async (req, res) => {
  const teacherId = req.params.id;

  const activities = await Teacher.find({ Teacher_id: teacherId });

  const grouped = {};

  activities.forEach(a => {
    const date = new Date(a.Created_at).toISOString().split("T")[0];
    if (!grouped[date]) grouped[date] = 0;
    grouped[date]++;
  });

  const trend = Object.entries(grouped).map(([date, count]) => ({
    date,
    count
  }));

  res.json(trend);
};
