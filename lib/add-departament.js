const inquirer = require("inquirer");
const db = require("./db-connection");

// Create the function that awaits the input from the inquirer about the new departament
const runDepartament = async () => {
  try {
    const departamentInput = await inquirer.prompt([
      {
        type: "input",
        name: "departament_name",
        message: "What is the name of the departament?",
      },
    ]);
    // Create the variable for the name of the new department based on the user input
    const newDepartment = departamentInput.departament_name;
    // Pass the new name as a parameter to the function
    addDepartment(newDepartment);
  } catch (error) {
    console.log(error);
  }
};

// Create function to insert the new departament into the database
const addDepartment = async (newDepartment) => {
  const sql = `INSERT INTO department (name)
    VALUES ('${newDepartment}')`;
  try {
    const result = await db.promise().query(sql);
    console.log("\n");
    console.log(`${newDepartment} ADDED TO DEPARTMENTS`);
    console.log("\n");
    return result;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { runDepartament };
