const express = require("express");
const router = express.Router();
const { getWeeklyPerformance } = require("../controllers/performanceController");

router.get("/weekly", getWeeklyPerformance);

module.exports = router;