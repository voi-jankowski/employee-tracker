const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const db = require("../db-connection");

// Create the function that awaits the input from the inquirer about the selected department to view the employees assigned to it
const viewEmployeesByDepartment = async () => {
  try {
    // Get the names of all departments
    let allDep = await db.promise().query(`SELECT * FROM department`);
    //   Get all the names of the departments
    const allDepNames = allDep[0].map((res) => res.name);

    const byDepInput = await inquirer.prompt([
      {
        type: "list",
        name: "dep_selected",
        message: "Which department's employees would you like to view?",
        choices: allDepNames,
      },
    ]);
    // // Check what is the id of chosen department
    const selectedDep = allDep[0].filter(
      (obj) => obj.name === byDepInput.dep_selected
    );
    const selectedDepId = selectedDep[0].id;

    // Pass the user input as a parameter to viewByManager function
    viewByDep(selectedDepId, byDepInput.dep_selected);
  } catch (error) {
    console.log(error);
  }
};

const viewByDep = async (dep_id, dep_name) => {
  // Display all employess of the department
  // Run sql query from view_by_dep.sql file
  const sqlByDep = fs
    .readFileSync(path.join(__dirname, "..", "../db/view_by_dep.sql"))
    .toString();
  const params = [dep_id];

  try {
    const result = await db.promise().query(sqlByDep, params);
    console.log("\n");
    console.log(`VIEW ALL EMPLOYEES OF ${dep_name}`);
    console.log("\n");
    console.table(result[0]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { viewEmployeesByDepartment };
