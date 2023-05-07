const inquirer = require("inquirer");
const db = require("./db-connection");

// Create the function that awaits the input from the inquirer about the new role
const runRole = async () => {
  try {
    // Get he names of all departaments from the database
    const sql = `SELECT name FROM department`;
    let allDep = await db.promise().query(sql);

    const roleInput = await inquirer.prompt([
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
        // Get the values of name in the array using map method.
        choices: allDep[0].map((res) => res.name),
      },
    ]);
    
    console.log(roleInput);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { runRole };
