const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const db = require("../db-connection");

// Create the function that awaits the input from the inquirer about the selected department to view its budget
const runviewDepBudget = async () => {
  try {
    // Get all of the departments
    let allDep = await db.promise().query(`SELECT * FROM department`);
    //   Get all the names of the departments
    const allDepNames = allDep[0].map((res) => res.name);

    const budgetInput = await inquirer.prompt([
      {
        type: "list",
        name: "dep_selected",
        message: "Which department's budget would you like to view?",
        choices: allDepNames,
      },
    ]);
    // // Check what is the id of chosen department
    const selectedDep = allDep[0].filter(
      (obj) => obj.name === budgetInput.dep_selected
    );
    const selectedDepId = selectedDep[0].id;

    // Pass the user input as a parameter to viewByManager function
    viewDepBudget(selectedDepId, budgetInput.dep_selected);
  } catch (error) {
    console.log(error);
  }
};

const viewDepBudget = async (dep_id, dep_name) => {
  // Display the budget of the department based of the combined salaries
  // Run sql query from view_budget.sql file
  const sqlBudget = fs
    .readFileSync(path.join(__dirname, "..", "../db/view_budget.sql"))
    .toString();
  const params = [dep_id];

  try {
    const result = await db.promise().query(sqlBudget, params);
    console.log("\n");
    console.log(`VIEW THE TOTAL UTILIZED BUDGET OF ${dep_name}`);
    console.log("\n");
    console.table(result[0]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { runviewDepBudget };
