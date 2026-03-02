const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  Teacher_id: String,
  Teacher_name: String,
  Grade: Number,
  Subject: String,
  Activity_type: String,
  Created_at: Date
});

module.exports = mongoose.model("Teacher", teacherSchema);