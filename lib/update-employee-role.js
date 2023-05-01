const inquirer = require("inquirer");
// const { async } = require("rxjs");

// Array of questions for the user
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

// Create the function that awaits the input from the inquirer about the updates to the role
const runUpdateEmployeeRole = async () => {
  try {
    const updateRoleInput = await inquirer.prompt(updateRoleQuestions);
    console.log(updateRoleInput);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { runUpdateEmployeeRole };
