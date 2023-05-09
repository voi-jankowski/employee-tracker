const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const db = require("../db-connection");

// Create the function that awaits the input from the inquirer about the selected manager to view the employees assigned to them
const viewEmployeesByManager = async () => {
  try {
    // Get the names of all managers assigned to employees in the database
    // Get the all the ids of managers assigned
    let allManagerIds = await db
      .promise()
      .query(`SELECT manager_id FROM employee`);
    allManagerIds = allManagerIds[0].map((res) => res.manager_id);
    // Get all the employees that can be assigned as managers by checking against the ids of assigned managers
    let sql = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS manager FROM employee`;
    let allManagers = await db.promise().query(sql);
    const assignedManagers = allManagers[0].filter((obj) =>
      allManagerIds.includes(obj.id)
    );

    const assignedManager = assignedManagers.map((res) => res.manager);
    const byManagerInput = await inquirer.prompt([
      {
        type: "list",
        name: "manager_selected",
        message: "Which manager's employees would you like to view?",
        choices: assignedManager,
      },
    ]);

    // Access the value of the user input

    // // Check what is the id of chosen manager
    const selectedManager = assignedManagers.filter(
      (obj) => obj.manager === byManagerInput.manager_selected
    );
    const selectedManagerId = selectedManager[0].id;

    // Pass the user input as a parameter to viewByManager function
    viewByManager(selectedManagerId, byManagerInput.manager_selected);
  } catch (error) {
    console.log(error);
  }
};

const viewByManager = async (manager_id, manager) => {
  // Display all employess of the manager
  // Run sql query from view_by_manager.sql file
  const sqlByManager = fs
    .readFileSync(path.join(__dirname, "..", "../db/view_by_manager.sql"))
    .toString();
  const params = [manager_id];

  try {
    const result = await db.promise().query(sqlByManager, params);
    console.log("\n");
    console.log(`VIEW ${manager}'s EMPLOYEES`);
    console.log("\n");
    console.table(result[0]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { viewEmployeesByManager };
