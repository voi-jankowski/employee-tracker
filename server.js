const inquirer = require("inquirer");

const { viewDepartaments, viewRoles, viewEmployees } = require("./lib/view.js");
const { runDepartament } = require("./lib/add-departament.js");
const { runRole } = require("./lib/add-role.js");
const { runEmployee } = require("./lib/add-employee.js");
const { runUpdateEmployeeRole } = require("./lib/update-employee-role.js");

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
    if ((firstInput.task = "View all departments")) return viewDepartaments();
    if ((firstInput.task = "View all roles")) return viewRoles();
    if ((firstInput.task = "View all employees")) return viewEmployees();
    if ((firstInput.task = "Add a department")) runDepartament();
    if ((firstInput.task = "Add a role")) runRole();
    if ((firstInput.task = "Add an employee")) runEmployee();
    if ((firstInput.task = "Update an employee role")) runUpdateEmployeeRole();
  } catch (error) {
    console.log(error);
  }
};

run();
module.exports = { run };
