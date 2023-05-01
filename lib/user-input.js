const inquirer = require("inquirer");
const { async } = require("rxjs");

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
const departamentQuestions = [
  {
    type: "input",
    name: "departament-name",
    message: "What is the name of the departament?",
  },
];

const roleQuestions = [
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
    name: "departament",
    message: "Which departament does the role belong to?",
    choices: [],
  },
];

const employeeQuestions = [
  {
    type: "input",
    name: "first-name",
    message: "What is the employee's first name?",
  },
  {
    type: "input",
    name: "last-name",
    message: "What is the employee's last name?",
  },
  {
    type: "list",
    name: "employee-role",
    message: "What is the employee's role?",
    choices: [],
  },
  {
    type: "list",
    name: "manager",
    message: "Who is the employee's manager?",
    choices: [],
  },
];

const updateRoleQuestions = [
  {
    type: "list",
    name: "employee-to-update",
    message: "Which employee's role do you want to update?",
    choices: [],
  },
  {
    type: "list",
    name: "role-assigned",
    message: "Which role do you want to assign the selected employee?",
    choices: [],
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
