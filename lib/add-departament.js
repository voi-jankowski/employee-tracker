const inquirer = require("inquirer");
const { async } = require("rxjs");

// Array of questions for the user
const departamentQuestions = [
  {
    type: "input",
    name: "departament-name",
    message: "What is the name of the departament?",
  },
];

// Create the function that awaits the input from the inquirer about the new departament
const runDepartament = async () => {
  try {
    const departamentInput = await inquirer.prompt(departamentQuestions);
    console.log(departamentInput);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { runDepartament };
