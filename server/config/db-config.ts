import mongoose from "mongoose";
import { insertCourses } from "../utils/insert-courses";

// Config
const MONGODB_URI = "mongodb://localhost:27017/courseApp";

// Connect DB
const connectDB = () =>
  mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => { 
      console.log("Connected to the database");
      insertCourses();
    })
    .catch((error) => { console.error("Error connecting to the database:", error); process.exit(1); });

// Close DB
const closeDB = () =>
  mongoose.connection.close()
    .then(() => console.log("Database connection closed"))
    .catch((error) => console.error("Error closing the database connection:", error));

export { connectDB, closeDB };