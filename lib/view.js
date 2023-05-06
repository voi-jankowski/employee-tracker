// const mysql = require("mysql2");
const db = require("./db-connection");
const { run } = require("../server.js");
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
  const sql = `source ./db/view_roles.sql`;
  try {
    const result = await db.promise().query(sql);
    console.log(result[0]);
  } catch (err) {
    console.log(err);
  }
  //   db.query(`source ./db/view_roles.sql`, (err, result1) => {
  //     if (err) {
  //       res.status(500).json({ error: err.message });
  //       return;
  //     }
  //     console.table(result1);
  //   });
  //   run();
};

const viewEmployees = () => {};

module.exports = { viewDepartaments, viewRoles, viewEmployees };
