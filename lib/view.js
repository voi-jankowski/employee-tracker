
const path = require("path");
const fs = require("fs");
const db = require("./db-connection");

// Functions to view the data

// Create a function to display all departments
exports.viewDepartaments = async () => {
  const sql = `SELECT * FROM department`;
  try {
    const result = await db.promise().query(sql);
    console.log("\n");
    console.log("VIEW ALL DEPARTMENTS");
    console.log("\n");
    console.table(result[0]);
  } catch (err) {
    console.log(err);
  }
};

// Create a function to display all roles
exports.viewRoles = async () => {
  // Method to run sql queries from sepqrqte sql file sourced from https://medium.com/@johnkolo/how-to-run-multiple-sql-queries-directly-from-an-sql-file-in-node-js-part-1-dce1e6dd2def
  const sqlRoles = fs
    .readFileSync(path.join(__dirname, "../db/view_roles.sql"))
    .toString();

  try {
    const result = await db.promise().query(sqlRoles);
    console.log("\n");
    console.log("VIEW ALL ROLES");
    console.log("\n");
    console.table(result[0]);
  } catch (err) {
    console.log(err);
  }
};

// Create a function to display all employees
exports.viewEmployees = async () => {
  // Method to run sql queries from sepqrqte sql file
  const sqlEmployees = fs
    .readFileSync(path.join(__dirname, "../db/view_employees.sql"))
    .toString();
  try {
    const result = await db.promise().query(sqlEmployees);
    console.log("\n");
    console.log("VIEW ALL EMPLOYEES");
    console.log("\n");
    console.table(result[0]);
  } catch (err) {
    console.log(err);
  }
};

// module.exports = { viewDepartaments, viewRoles, viewEmployees };
