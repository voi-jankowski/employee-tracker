const inquirer = require("inquirer");
const db = require("../db-connection");

// Create the function that awaits the input from the inquirer about the updates to employee's manager
const runUpdateEmployeeManager = async () => {
  try {
    // Get the names of all employees in the database
    let sql = `SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee FROM employee`;
    let allEmployees = await db.promise().query(sql);
    allEmployees = allEmployees[0].map((res) => res.employee);

    // Add none as an option for a manager
    let allManagers = allEmployees.push("none");

    const updateEmployeeInput = await inquirer.prompt([
      {
        type: "list",
        name: "employee_to_update",
        message: "Which employee's manager do you want to update?",
        choices: allEmployees,
      },
      {
        type: "list",
        name: "manager_assigned",
        message:
          "Which manager do you want to assign to the selected employee?",
        choices: allManagers,
      },
    ]);
    console.log(updateEmployeeInput);

    // Access the values of the user input
    const { employee_to_update, manager_assigned } = updateEmployeeInput;

    // Check what is the id of chosen manager, if manager set to 'none' set id to 'null'
    const managerRes = await db
      .promise()
      .query(
        `SELECT id FROM staff_db.employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = "${manager_assigned}"`
      );
    let managerId;
    manager_assigned === "none"
      ? (managerId = null)
      : (managerId = `${managerRes[0][0].id}`);

    // Check if the chosen manager is not the same as selected employee
    if (employee_to_update === manager_assigned) {
      console.log(
        "The chosen manager cannot be the same person as the selected employee. For the new manager choose another employee or 'none'."
      );
      setTimeout(() => {
        runUpdateEmployeeManager();
      }, 1000);
      return;
    }

    // Pass the user input as parameters to updateEmployeeManager function
    updateEmployeeManager(employee_to_update, managerId);
  } catch (error) {
    console.log(error);
  }
};

// Create a function to update the manager of a chosen employee

const updateEmployeeManager = async (employee, manager) => {
  const sql = `UPDATE employee
  SET manager_id = ${manager}
  WHERE CONCAT(employee.first_name, ' ', employee.last_name) = '${employee}'`;
  try {
    const result = await db.promise().query(sql);
    console.log("\n");
    console.log(`${employee}'s MANAGER UPDATED TO ${manager_assigned}.`);
    console.log("\n");
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { runUpdateEmployeeManager };
