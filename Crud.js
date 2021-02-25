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

// view deleate, update functions ===============================

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

// update function
const Update = () => {
  console.log("Updating?...\n");
  connection.query(
    `UPDATE employee SET ? WHERE ?`,
    [
      {
        firstName: "Billow",
      },
      {
        id: "1",
      },
    ],
    (err, res) => {
      if (err) throw err;
      console.log("Welcome!");
      viewEmployees();
    }
  );
};

// inquire prompts ===================================

inquirer.prompt([
  {
    type: "list",
    name: "choice",
    message: "How would you like to assert dominance on the organization?",
    choices: [
      "View all employees",
      "Add a emplpyee",
      "Update a employee",
      "Fire a employee",
      "View all employee roles",
      "Add a employee role",
      "Update a employee role",
      "remove a employee role",
      "View all departments",
      "Add a department",
      "Update a department",
      "Remove a department",
    ],
  },
]);

// addition- employee
inquirer.prompt([
  {
    type: "input",
    name: "fname",
    message: `Enter first the employees first name`,
  },
  {
    type: "input",
    name: "lname",
    message: `Enter first the employees last name`,
  },
  {
    type: "input",
    name: "role",
    message: `Enter the employee role number`,
  },
]);

// addition- role
inquirer.prompt([
  {
    type: "input",
    name: "title",
    message: `Enter the new roles title`,
  },
  {
    type: "input",
    name: "sal",
    message: `Enter the salary for the role`,
  },
]);

// addition- department
inquirer.prompt([
  {
    type: "input",
    name: "dep",
    message: `Enter the departments title`,
  },
]);

// removal
inquirer.prompt([
  {
    type: "input",
    name: "choice",
    message: `Which ${answer} by id would you like to remove`,
  },
]);
