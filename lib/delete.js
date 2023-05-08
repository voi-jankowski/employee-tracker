const inquirer = require("inquirer");
const db = require("./db-connection");

// Create the function that awaits the input from the inquirer what data they want to delete
const runDeleteOptions = async () => {
  try {
    const deleteInput = await inquirer.prompt([
      {
        type: "list",
        name: "delete_task",
        message: "Which data would you like to delete?",
        choices: ["departments", "roles", "employees"],
      },
    ]);

    switch (deleteInput.delete_task) {
      case "departments":
        await rundeleteDepartaments();

        break;

      case "roles":
        await rundeleteRoles();

        break;

      case "employees":
        await rundeleteEmployees();

        break;
    }
  } catch (error) {
    console.log(error);
  }
};

// RUN FUNCTIONS

// Create the function that awaits the input from the inquirer about which department to delete
const rundeleteDepartaments = async () => {
  try {
    // Get all the departments
    let allDep = await db.promise().query(`SELECT * FROM department`);
    //   Get all the names of the departments
    const allDepNames = allDep[0].map((res) => res.name);

    const depInput = await inquirer.prompt([
      {
        type: "list",
        name: "dep_selected",
        message: "Which department would you like to delete?",
        choices: allDepNames,
      },
    ]);
    console.log(depInput);

    // Pass the user input as a parameter to deleteDepartament function
    deleteDepartament(depInput.dep_selected);
  } catch (error) {
    console.log(error);
  }
};

// Create the function that awaits the input from the inquirer about which role to delete.
const rundeleteRoles = async () => {
  try {
    // Get the names of all the roles
    let allRoles = await db.promise().query(`SELECT title FROM role`);
    const allRoleNames = allRoles[0].map((res) => res.title);

    const roleInput = await inquirer.prompt([
      {
        type: "list",
        name: "role_selected",
        message: "Which role would you like to delete?",
        choices: allRoleNames,
      },
    ]);
    console.log(roleInput);

    // Pass the user input as a parameter to deleteRole function
    deleteRole(roleInput.role_selected);
  } catch (error) {
    console.log(error);
  }
};

// Create the function that awaits the input from the inquirer about which employee to delete.
const rundeleteEmployees = async () => {
  try {
    // Get the names of all employees
    let allEmployees = await db
      .promise()
      .query(
        `SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name FROM employee`
      );
    const allEmployeeNames = allEmployees[0].map((res) => res.employee_name);

    const employeeInput = await inquirer.prompt([
      {
        type: "list",
        name: "employee_selected",
        message: "Which employee would you like to delete?",
        choices: allEmployeeNames,
      },
    ]);
    console.log(employeeInput);

    // Pass the user input as a parameter to deleteEmployee function
    deleteEmployee(employeeInput.employee_selected);
  } catch (error) {
    console.log(error);
  }
};

// DELETE FUNCTIONS

// Create a function to delete a chosen department
const deleteDepartament = async (dep) => {
  const sqlDep = `DELETE FROM department WHERE name = '${dep}'`;
  try {
    const result = await db.promise().query(sqlDep);
    console.log("\n");
    console.log(`${dep} HAS BEEN DELETED FROM DEPARTMENTS.`);
    console.log("\n");
    return result;
  } catch (err) {
    console.log(err);
  }
};

// Create a function to delete a chosen role
const deleteRole = async (role) => {
  const sqlRole = `DELETE FROM role WHERE title = '${role}'`;
  try {
    const result = await db.promise().query(sqlRole);
    console.log("\n");
    console.log(`${role} HAS BEEN DELETED FROM ROLES.`);
    console.log("\n");
    return result;
  } catch (err) {
    console.log(err);
  }
};

// Create a function to delete a chosen employee
const deleteEmployee = async (employee) => {
  const sqlEmployee = `DELETE FROM employee WHERE (CONCAT(employee.first_name, ' ', employee.last_name)) = '${employee}'`;
  try {
    const result = await db.promise().query(sqlEmployee);
    console.log("\n");
    console.log(`${employee} HAS BEEN DELETED FROM EMPLOYEES.`);
    console.log("\n");
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { runDeleteOptions };
