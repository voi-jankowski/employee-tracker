// const mysql = require("mysql2");
const db = require("./db-connection");


// Functions to view the data

const viewDepartaments = () => {
  let sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(result);
  });
  run();
};

const viewRoles = () => {};

const viewEmployees = () => {};

module.exports = { viewDepartaments, viewRoles, viewEmployees };
