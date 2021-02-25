const mysql = require("mysql");
const inquirer = require("inquirer");
cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "PantheR1994*",
  database: "dre_db",
});

// Function to display all employees and data
const viewEmployees = () => {
  console.log("Viewing all employees\n");
  connection.query(
    `SELECT employee.id, employee.firstName, employee.lastName, role.salary, role.title, department.name
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON  role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
};

// Function to deleate given employe
const Delete = () => {
  console.log("Firing ?...\n");
  connection.query(
    `DELETE FROM employee WHERE ?`,
    {
      id: 5,
    },
    (err, res) => {
      if (err) throw err;
      console.log("Gone!");
      viewEmployees();
    }
  );
};

// Function to deleate given employe
const Add = () => {
  console.log("Firing?...\n");
  connection.query(
    `INSERT INTO employee (firstName, lastName, role_id) VALUES("John", "Buck", 5)`,
    (err, res) => {
      if (err) throw err;
      console.log("Welcome!");
      viewEmployees();
    }
  );
};

Add();
