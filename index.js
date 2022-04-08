const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
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
    "View All Deparments", 
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
      addEmployee();
      break;

      case "Update Employee": 
      updateEmployee();
      break;
    }
  });
}


//functions for prompt choice

//view departnemts
function viewDepartments() {
  db.query("SELECT")
}