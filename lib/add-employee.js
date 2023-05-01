const inquirer = require("inquirer");
const { async } = require("rxjs");

// Array of questions for the user
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

// Create the function that awaits the input from the inquirer about the new employee
const runEmployee = async () => {
  try {
    const employeeInput = await inquirer.prompt(employeeQuestions);
    console.log(employeeInput);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { runEmployee };
