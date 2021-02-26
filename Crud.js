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

// view deleate, update functions ===============================

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

// Function to delete
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

// Transitional function to add
const Add = (answer) => {
  switch (answer) {
    case "Add a employee":
      addEmp();
      break;
    case "Add a employee role":
      addRole();
      break;
  }
};

// update function with inquirer built in
const Update = (answers) => {
  switch (answer.first) {
    case "Update a employee":
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
  }
};

// inquire prompts ===================================
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
          viewEmployees();
          init();
        }
      );
    });
};

// addition- department
addDep = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "dep",
      message: `Enter the departments title`,
    },
  ]);
};

// update- employee
updateEmp = () => {
  inquirer.prompt([
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
  ]);
};

// update- role
updateRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "roleup1",
      message: `Enter the id of the role you would like to update`,
    },
    {
      type: "input",
      name: "empup2",
      message: `Enter the new title`,
    },
    {
      type: "input",
      name: "empup2",
      message: `Enter the new salary`,
    },
  ]);
};

// update- department
updateDep = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "roleup1",
      message: `Enter the id of the department you would like to update`,
    },
    {
      type: "input",
      name: "empup2",
      message: `Enter the new department name`,
    },
  ]);
};

// removal- works on all
deleteInq = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "gone",
      message: `Which ${answer} by id would you like to remove`,
    },
  ]);
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
      Add(answers.first);
      break;
    case "Add a employee role":
      Add(answers.first);
      break;
    case "Add a department":
      Add(answers.first);
      break;

    case "Update a employee":
      Update(answers.first);
      break;

    case "Update a employee role":
      Update(answers.first);
      break;

    case "Update a department":
      Update(answers.first);
      break;

    case "Fire a employee":
      Delete(answers.first);
      break;
    case "Remove a employee role":
      Delete(answers.first);
      break;
    case "Remove a department":
      Delete(answers.first);
      break;
  }
};
init();
