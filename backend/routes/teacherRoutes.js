const express = require("express");
const router = express.Router();
const {
  getTeachers,
  getTeacherList,
  getTeacherStats,
  getTeacherActivities,
  getTeacherTrends
} = require("../controllers/teacherController");

router.get("/teachers", getTeachers);
router.get("/teachers/list", getTeacherList);

router.get("/teacher/:id/stats", getTeacherStats);
router.get("/teacher/:id/activities", getTeacherActivities);
router.get("/teacher/:id/trends", getTeacherTrends);

module.exports = router;