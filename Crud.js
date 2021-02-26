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

// view functions ===============================

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
      init();
    }
  );
};

// function to view role or department table
const viewTable = (answer) => {
  if (answer === "View all employee roles") {
    console.log("Viewing all employee roles\n");
    connection.query(`SELECT * FROM role`, (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    });
  } else {
    console.log(answer);
    console.log("Viewing all departments\n");
    connection.query(`SELECT * FROM department`, (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    });
  }
};

// Add/updat/delete/functions ===================================

// addition- employee
addEmp = () => {
  inquirer
    .prompt([
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
    ])
    .then((answers) => {
      console.log("Adding Employee\n");
      connection.query(
        `INSERT INTO employee (firstName, lastName, role_id) VALUES ("${
          answers.fname
        }", 
        
        "${answers.lname}",
        
        ${parseInt(answers.role)})`,
        (err, res) => {
          if (err) throw err;
          console.log("Employee added!");
          viewEmployees();
          init();
        }
      );
    });
};

// addition- role
addRole = () => {
  inquirer
    .prompt([
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
      {
        type: "input",
        name: "did",
        message: `Enter the role's department id`,
      },
    ])
    .then((answers) => {
      console.log("Adding Role\n");
      connection.query(
        `INSERT INTO role(title, salary, department_id) VALUES ("${
          answers.title
        }", 
        
        "${answers.sal}",
        
        ${parseInt(answers.did)})`,
        (err, res) => {
          if (err) throw err;
          console.log("Role added!");
          init();
        }
      );
    });
};

// addition- department
addDep = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dep",
        message: `Enter the departments title`,
      },
    ])
    .then((answers) => {
      console.log("Adding Department\n");
      connection.query(
        `INSERT INTO department(name) VALUES ("${answers.dep}")`,
        (err, res) => {
          if (err) throw err;
          console.log(" department added!");
          init();
        }
      );
    });
};

// update- employee
updateEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "empup1",
        message: `Enter the id of the employee you would like to update`,
      },
      {
        type: "input",
        name: "empup2",
        message: `Enter the new first name `,
      },
      {
        type: "input",
        name: "empup3",
        message: `Enter the new last name`,
      },
      {
        type: "input",
        name: "empup4",
        message: `Enter the new role_id`,
      },
    ])
    .then((answers) => {
      console.log("Updating employee\n");
      connection.query(
        `UPDATE employee SET ?, ?, ? WHERE ?`,
        [
          {
            firstName: answers.empup2,
          },
          {
            lastName: answers.empup3,
          },
          {
            role_id: answers.empup4,
          },
          {
            id: answers.empup1,
          },
        ],
        (err, res) => {
          if (err) throw err;
          console.log("Employee Updated!");
          init();
        }
      );
    });
};

// update- role
updateRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleup1",
        message: `Enter the id of the role you would like to update`,
      },
      {
        type: "input",
        name: "roleup2",
        message: `Enter the new title`,
      },
      {
        type: "input",
        name: "roleup3",
        message: `Enter the new salary`,
      },
    ])
    .then((answers) => {
      console.log("Updating employee\n");
      connection.query(
        `UPDATE employee SET ?, ?, ? WHERE ?`,
        [
          {
            title: answers.roleup2,
          },
          {
            salary: answers.roleup3,
          },
          {
            department_id: answers.roleup4,
          },
          {
            id: answers.roleup1,
          },
        ],
        (err, res) => {
          if (err) throw err;
          console.log("Roles updated!");
          init();
        }
      );
    });
};

// update- department
updateDep = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "depup1",
        message: `Enter the id of the department you would like to update`,
      },
      {
        type: "input",
        name: "depup2",
        message: `Enter the new department name`,
      },
    ])
    .then((answers) => {
      console.log("Updating Departments\n");
      connection.query(
        `UPDATE department SET ? WHERE ?`,
        [
          {
            name: answers.dep2,
          },
          {
            id: answers.dep1,
          },
        ],
        (err, res) => {
          if (err) throw err;
          console.log("Departments updated!");
          init();
        }
      );
    });
};

// removal- works on all
deleteAny = (answer) => {
  switch (answer) {
    case "Fire a employee":
      inquirer
        .prompt([
          {
            type: "input",
            name: "gone",
            message: `Which employee by id would you like to remove?`,
          },
        ])
        .then((answers) => {
          console.log("Deleting employee\n");
          connection.query(
            `Delete from employee WHERE ${answers.gone}`,
            (err, res) => {
              if (err) throw err;
              console.log("employee deleted!");
              init();
            }
          );
        });
      break;

    case "Remove a employee role":
      inquirer
        .prompt([
          {
            type: "input",
            name: "gone",
            message: `Which role by id would you like to remove?`,
          },
        ])
        .then((answers) => {
          console.log("Deleting employee role\n");
          connection.query(
            `Delete from role WHERE ${answers.gone}`,
            (err, res) => {
              if (err) throw err;
              console.log("role deleted!");
              init();
            }
          );
        });
      break;

    case "Remove a department":
      inquirer
        .prompt([
          {
            type: "input",
            name: "gone",
            message: `Which department by id would you like to remove?`,
          },
        ])
        .then((answers) => {
          console.log("Deleting department\n");
          connection.query(
            `Delete from department WHERE ${answers.gone}`,
            (err, res) => {
              if (err) throw err;
              console.log("department deleted!");
              init();
            }
          );
        });
      break;
  }
};
// initialization and transition==================
// Initial question
init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "first",
        message: "How would you like to assert dominance on the organization?",
        choices: [
          "View all employees",
          "Add a employee",
          "Update a employee",
          "Fire a employee",
          "View all employee roles",
          "Add a employee role",
          "Update a employee role",
          "Remove a employee role",
          "View all departments",
          "Add a department",
          "Update a department",
          "Remove a department",
        ],
      },
    ])
    .then((answers) => {
      transition(answers);
    });
};

// transition after first prompt
transition = (answers) => {
  switch (answers.first) {
    case "View all employees":
      viewEmployees();
      break;
    case "View all departments":
      console.log(answers.first);
      viewTable(answers.first);
      break;

    case "View all employee roles":
      console.log(answers.first);
      viewTable(answers.first);
      break;

    case "Add a employee":
      addEmp();
      break;
    case "Add a employee role":
      addRole();
      break;
    case "Add a department":
      addDep();
      break;

    case "Update a employee":
      updateEmp();
      break;

    case "Update a employee role":
      updateRole();
      break;

    case "Update a department":
      updateDep();
      break;

    case "Fire a employee":
      deleteAny(answers.first);
      break;
    case "Remove a employee role":
      deleteAny(answers.first);
      break;
    case "Remove a department":
      deleteAny(answers.first);
      break;
  }
};
// kicks everything off
init();
