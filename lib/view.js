// const mysql = require("mysql2");
const db = require("./db-connection");

// Functions to view the data

const viewDepartaments = async () => {
  const sql = `SELECT * FROM department`;
  try {
    const result = await db.promise().query(sql);
    console.table(result[0]);
  } catch (err) {
    console.log(err);
  }
};

const viewRoles = async () => {
  const sql = `source ../db/view_roles.sql`;
  try {
    const result = await db.promise().query(sql);
    console.log(result[0]);
  } catch (err) {
    console.log(err);
  }
};

const viewEmployees = async () => {
  const sql = `source ../db/view_employees.sql`;
  try {
    const result = await db.promise().query(sql);
    console.log(result[0]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { viewDepartaments, viewRoles, viewEmployees };
