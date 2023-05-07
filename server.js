const inquirer = require("inquirer");

// Import and require all the functions for different choices in the first user prompt.
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

// Create the main function that awaits the in put from the inquirer and calls a relevant function based on the user input
const run = async () => {
  try {
    const firstInput = await inquirer.prompt(startQuestion);
    console.log(firstInput);
    switch (firstInput.task) {
      case "View all departments":
        await viewDepartaments();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "View all roles":
        await viewRoles();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "View all employees":
        await viewEmployees();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "Add a department":
        await runDepartament();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "Add a role":
        await runRole();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "Add an employee":
        await runEmployee();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "Update an employee role":
        await runUpdateEmployeeRole();
        setTimeout(() => {
          run();
        }, 1000);
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

run();
