const inquirer = require("inquirer");
// const { async } = require("rxjs");

const { viewDepartaments, viewRoles, viewEmployees } = require("./view.js");
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
    if ((firstInput.task = "View all departments")) await viewDepartaments();
    if ((firstInput.task = "View all roles")) await viewRoles();
    if ((firstInput.task = "View all employees")) await viewEmployees();
    if ((firstInput.task = "Add a department")) await runDepartament();
    if ((firstInput.task = "Add a role")) await runRole();
    if ((firstInput.task = "Add an employee")) await runEmployee();
    if ((firstInput.task = "Update an employee role"))
      await runUpdateEmployeeRole();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { run };
