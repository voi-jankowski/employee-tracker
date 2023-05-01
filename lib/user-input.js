const inquirer = require("inquirer");
const { async } = require("rxjs");

const { runDepartament } = require("./add-departament.js");
const { runRole } = require("./add-role.js");
const { runEmployee } = require("./add-employee.js");
const { runUpdateEmployeeRole } = require("./update-employee-role.js");

// Array of questions for the user
const startQuestion = [
  {
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
  },
];

// Create the main function that awaits the in put from the inquirer
const run = async () => {
  try {
    const firstInput = await inquirer.prompt(startQuestion);
    console.log(firstInput);
    if ((firstInput.task = "View all departments")) viewDepartaments();
    if ((firstInput.task = "View all roles")) viewRoles();
    if ((firstInput.task = "View all employees")) viewEmployees();
    if ((firstInput.task = "Add a department")) runDepartament();
    if ((firstInput.task = "Add a role")) runRole();
    if ((firstInput.task = "Add an employee")) runEmployee();
    if ((firstInput.task = "Update an employee role")) runUpdateEmployeeRole();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { run };
