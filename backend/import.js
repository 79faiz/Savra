require("dotenv").config();
const XLSX = require("xlsx");
const mongoose = require("mongoose");
const Teacher = require("./models/Teacher");

async function start() {
  try {
    // CONNECT TO ATLAS
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected!");

    // EXACT FILE LOCATION
    const workbook = XLSX.readFile("./data/Savra_Teacher Data Set.xlsx");
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    let jsonData = XLSX.utils.sheet_to_json(sheet);

    // FIX DATE FORMAT
    jsonData = jsonData.map((item) => ({
      ...item,
      Created_at: new Date(item.Created_at)
    }));

    // CLEAN OLD DATA (optional)
    await Teacher.deleteMany({});
    console.log("Old data removed!");

    // INSERT DATA
    await Teacher.insertMany(jsonData);
    console.log("Data Imported Successfully!");

    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

start();