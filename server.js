const inquirer = require("inquirer");

// Import and require all the functions for different choices in the first user prompt.
const {
  viewDepartaments,
  viewRoles,
  viewEmployees,
} = require("./lib/view/view.js");
const { runDepartament } = require("./lib/add/add-departament.js");
const { runRole } = require("./lib/add/add-role.js");
const { runEmployee } = require("./lib/add/add-employee.js");
const {
  runUpdateEmployeeRole,
} = require("./lib/update/update-employee-role.js");
const { runUpdateEmployeeManager } = require("./lib/update/update-manager.js");
const { viewEmployeesByManager } = require("./lib/view/view-by-manager.js");
const {
  viewEmployeesByDepartment,
} = require("./lib/view/view-by-departament.js");
const { runDeleteOptions } = require("./lib/delete.js");
const { runviewDepBudget } = require("./lib/view/view-budget.js");

// The first prompt for the user
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
      "Update employee role",
      "Update employee manager",
      "View employees by manager",
      "View employees by department",
      "Delete department, role or employee",
      "View the total utilized budget of a department",
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

      case "Update employee role":
        await runUpdateEmployeeRole();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "Update employee manager":
        await runUpdateEmployeeManager();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "View employees by manager":
        await viewEmployeesByManager();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "View employees by department":
        await viewEmployeesByDepartment();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "Delete department, role or employee":
        await runDeleteOptions();
        setTimeout(() => {
          run();
        }, 1000);
        break;

      case "View the total utilized budget of a department":
        await runviewDepBudget();
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
