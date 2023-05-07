const inquirer = require("inquirer");
const db = require("../db-connection");

// Create the function that awaits the input from the inquirer about the new role
const runRole = async () => {
  try {
    // Get the names of all departaments from the database
    let allDep = await db.promise().query(`SELECT name FROM department`);

    const roleInput = await inquirer.prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department",
        message: "Which departament does the role belong to?",
        // Get the values of name in the array using map method.
        choices: allDep[0].map((res) => res.name),
      },
    ]);
    // Access the values of the user input
    const { role, salary, department } = roleInput;
    // Check if the answers are not empty
    if (role.trim() === "" || salary.trim() === "") {
      console.log("Neither name nor salary can be empty. Please try again!");
      setTimeout(() => {
        runRole();
      }, 1000);
      return;
    }

    // Change salary into a number
    const salaryNumber = Number(salary);
    salaryNumber === NaN
      ? (console.log("Salary has to be a number. Please try again!"),
        setTimeout(() => {
          runRole();
        }, 1000))
      : salaryNumber;
    // Check what is the id of chosen departament
    const depRes = await db
      .promise()
      .query(`SELECT id FROM staff_db.department WHERE name = "${department}"`);
    let depId = depRes[0][0].id;
    // Pass the user input as parameters to addRole function
    addRole(role, salaryNumber, depId);
  } catch (error) {
    console.log(error);
  }
};

// Create a function to add a new role to the database

const addRole = async (role, salary, department) => {
  const sql = `INSERT INTO role (title, salary, department_id)
    VALUES ('${role}', '${salary}', '${department}')`;
  try {
    const result = await db.promise().query(sql);
    console.log("\n");
    console.log(`${role} ADDED TO ROLES`);
    console.log("\n");
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { runRole };
