const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");
require('dotenv').config();

//database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(err => {
  if(err) throw err;
  console.log('Database connected');
  startPrompts();
});

//start inquirer prompts
function startPrompts() {
  inquirer.prompt({ 
    type: "list", 
    message: "What would you like to do?", 
    name: "choice", 
    choices: [ 
    "View All Departments", 
    "View All Roles",
    "View All Employees", 
    "Add Department",
    "Add Role", 
    "Add Employee", 
    "Update Employee",
     ]
    })
  .then(function ({ choice }) {
    switch (choice) {
      case "View All Departments": 
      viewDepartments();
      break;

      case "View All Roles": 
      viewRoles();
      break;

      case "View All Employees": 
      viewEmployees();
      break;

      case "Add Department": 
      addDepartment();
      break;

      case "Add Role": 
      addRole();
      break;

      case "Add Employee": 
      
      break;

      case "Update Employee": 
      
      break;
    }
  });
}


//functions for prompt choice

//view departnemts
function viewDepartments() {
  db.query(`SELECT * FROM department`,
  function(err, res) {
    if (err) throw err
    console.table(res);
    startPrompts();
  });
}

//view roles
function viewRoles() {
  db.query("SELECT title, salary, department_id FROM role",
  function(err, res) {
    if (err) throw err
    console.table(res);
    startPrompts();
  });
}


//view employess
function viewEmployees() {
  db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
  function(err, res) {
    if (err) throw err
    console.table(res);
    startPrompts();
  });
}

//add department
function addDepartment() {
  inquirer.prompt(
    {
      name: "name",
      type: "input",
      message: "What department would you like to add?"
    })
    .then(function(res) {
      db.query("INSERT INTO department SET ?",
      {
        name: res.name
      },
      function(err, res) {
        if (err) throw err
        console.table(res);
        startPrompts();
      }
    )
  });
}

//add role (title and salary)
function addRole() {
  db.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function(err, res){
     inquirer.prompt([
    {
      name: "Title",
      type: "input", 
      message: "What is the title of this role?"
    },
    {
      name: "Salary",
      type: "input",
      message: "What is the salary for this role?"
    }])
    .then(function(res) {
      db.query("INSERT INTO role SET ?",
      {
        title: res.Title,
        salary: res.Salary,
      },
      function(err) {
        if (err) throw err
        console.table(res);
        startPrompts();
      }
    )
  }) 
  })
}