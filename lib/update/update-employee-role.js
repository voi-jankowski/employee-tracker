const inquirer = require("inquirer");
const db = require("../db-connection");

// Create the function that awaits the input from the inquirer about the updates to the role
const runUpdateEmployeeRole = async () => {
  try {
    // Get the names of all employees in the database
    let sql = `SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee FROM employee`;
    let allEmployees = await db.promise().query(sql);
    allEmployees = allEmployees[0].map((res) => res.employee);
    // Get the names of all available roles from the database
    let allRoles = await db.promise().query(`SELECT title FROM role`);
    allRoles = allRoles[0].map((res) => res.title);

    const updateRoleInput = await inquirer.prompt([
      {
        type: "list",
        name: "employee_to_update",
        message: "Which employee's role do you want to update?",
        choices: allEmployees,
      },
      {
        type: "list",
        name: "role_assigned",
        message: "Which role do you want to assign the selected employee?",
        choices: allRoles,
      },
    ]);

    // Access the values of the user input
    const { employee_to_update, role_assigned } = updateRoleInput;

    // Check what is the id of chosen role
    const roleRes = await db
      .promise()
      .query(`SELECT id FROM staff_db.role WHERE title = "${role_assigned}"`);
    let roleId = roleRes[0][0].id;

    // Pass the user input as parameters to updateEmployeeRole function
    updateEmployeeRole(employee_to_update, roleId);
  } catch (error) {
    console.log(error);
  }
};

// Create a function to update the role of a chosen employee

const updateEmployeeRole = async (employee, role) => {
  const sql = `UPDATE employee
  SET role_id = '${role}'
  WHERE CONCAT(employee.first_name, ' ', employee.last_name) = '${employee}'`;
  try {
    const result = await db.promise().query(sql);
    console.log("\n");
    console.log(`${employee}'s ROLE UPDATED`);
    console.log("\n");
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { runUpdateEmployeeRole };
