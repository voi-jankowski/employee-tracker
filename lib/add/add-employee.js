const inquirer = require("inquirer");
const db = require("../db-connection");

// Create the function that awaits the input from the inquirer about the new employee
const runEmployee = async () => {
  try {
    // Get the names of all available roles from the database
    let allRoles = await db.promise().query(`SELECT title FROM role`);
    allRoles = allRoles[0].map((res) => res.title);
    // Get the names of all managers in the database
    let sql = `SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS manager FROM employee`;
    let allManagers = await db.promise().query(sql);
    allManagers = allManagers[0].map((res) => res.manager);
    // Add none as an option for a manager
    allManagers.push("none");

    const employeeInput = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "employee_role",
        message: "What is the employee's role?",
        choices: allRoles,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: allManagers,
      },
    ]);

    // Access the values of the user input
    const { first_name, last_name, employee_role, manager } = employeeInput;

    // Check if the answers are not empty
    if (first_name.trim() === "" || last_name.trim() === "") {
      console.log(
        "Neither first name nor last name can be empty. Please try again!"
      );
      setTimeout(() => {
        runEmployee();
      }, 1000);
      return;
    }

    // Check what is the id of chosen role
    const roleRes = await db
      .promise()
      .query(`SELECT id FROM staff_db.role WHERE title = "${employee_role}"`);
    let roleId = roleRes[0][0].id;

    // Check what is the id of chosen manager, if manager set to 'none' set id to 'null'
    const managerRes = await db
      .promise()
      .query(
        `SELECT id FROM staff_db.employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = "${manager}"`
      );
    let managerId;
    manager === "none"
      ? (managerId = null)
      : (managerId = `${managerRes[0][0].id}`);

    // Pass the user input as parameters to addEmployee function
    addEmployee(first_name, last_name, roleId, managerId);
  } catch (error) {
    console.log(error);
  }
};

// Create a function to add a new employee to the database

const addEmployee = async (first_name, last_name, role, manager) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${first_name}', '${last_name}', '${role}', ${manager})`;
  try {
    const result = await db.promise().query(sql);
    console.log("\n");
    console.log(`${first_name} ${last_name} ADDED TO EMPLOYEES`);
    console.log("\n");
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { runEmployee };
