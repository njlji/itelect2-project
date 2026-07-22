// app.js - Main application entry point
console.log('Server starting...');

import { fetchSampleUsers } from "./api.js";
import { createTask } from "./utils.js";

async function main() {
  // Test fetchSampleUsers()
  try {
    const users = await fetchSampleUsers();
    console.log("Fetched users:", users);
  } catch (err) {
    console.error("Error fetching users:", err);
  }

  // Test createTask() with valid data
  try {
    const validTask = createTask({ title: "Complete project", dueDate: "2025-06-01" });
    console.log("Valid task created:", validTask);
  } catch (err) {
    console.error("Error creating valid task:", err);
  }

  // Test createTask() with invalid data
  try {
    const invalidTask = createTask({ title: "Incomplete task" });
    console.log("Invalid task created:", invalidTask);
  } catch (err) {
    console.error("Error creating invalid task:", err);
  }
}

main();
