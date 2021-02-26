-- forign keys and caskadeding allow universal change between tables

DROP DATABASE IF EXISTS dre_db;
CREATE DATABASE dre_db;
USE dre_db;

CREATE TABLE department(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(8,2)NOT NULL,
  department_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30)NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- selects all tables******

-- SELECT employee.id, employee.firstName, employee.lastName, role.salary, role.title, department.name
-- FROM employee
-- LEFT JOIN role ON employee.role_id = role.id
-- LEFT JOIN department ON  role.department_id = department.id;