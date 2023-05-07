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
    switch (firstInput.task) {
      case "View all departments":
        viewDepartaments();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "View all roles":
        viewRoles();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "View all employees":
        viewEmployees();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "Add a department":
        runDepartament();
        break;

      case "Add a role":
        runRole();
        break;

      case "Add an employee":
        runEmployee();
        break;

      case "Update an employee role":
        runUpdateEmployeeRole();
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

run();
