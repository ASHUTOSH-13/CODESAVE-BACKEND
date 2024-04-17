// deleteAllEntries.js

// Import Mongoose
const mongoose = require("mongoose");

// Import the Problem model
const Problem = require("./models/problem");

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/solvedproblems");

// Access the default connection
const db = mongoose.connection;

// Event listener for successful connection
db.once("open", async function () {
  try {
    // Delete all entries from the Problem collection
    await Problem.deleteMany({});
    console.log("All entries deleted successfully.");
  } catch (error) {
    console.error("Error deleting entries:", error);
  } finally {
    // Close the connection after deleting entries
    mongoose.connection.close();
  }
});

// Event listener for connection errors
db.on("error", console.error.bind(console, "connection error:"));
