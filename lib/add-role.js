const inquirer = require("inquirer");
const db = require("./db-connection");

// Array of questions for the user
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

// Create the function that awaits the input from the inquirer about the new role
const runRole = async () => {
  try {
    const roleInput = await inquirer.prompt(roleQuestions);
    console.log(roleInput);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { runRole };
