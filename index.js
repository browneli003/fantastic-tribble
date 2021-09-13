var inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection')


function connectionPrompt() {
inquirer
    .prompt([
        {
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add a department',
              'Add a role',
              'Add an employee',
              'Update employee role',
              'Exit'
          ]
        }
    ])
    .then(function(answer) {
        if (answer.action === 'View all departments') {
            viewDepartment();
        } else if (answer.action === 'View all roles') {
            viewRoles();
        } else if (answer.action === 'View all employees') {
            viewEmployees();
        } else if (answer.action === 'Add a department') {
            addDepartment();
        } else if (answer.action === 'Add a role') {
            addRole();
        } else if (answer.action === 'Add an employee') {
            addEmployee();
        } else if (answer.action === 'Update employee role') {
            updateRole();
        }
        else if (answer.action === 'Exit') {
            connection.end();
        }
    })
};

   function viewDepartment() {
connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw (err);
    console.table(res);
connectionPrompt();
})
    };

   function viewRoles() {
connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw (err);
    console.table(res);
})
connectionPrompt();
    };

    function viewEmployees() {
connection.query('SELECT * FROM employee', (err, res) =>{
    if (err) throw (err);
    console.table(res);
})
connectionPrompt();
    };

    function addDepartment() {
    inquirer
        .prompt([
            {
            message: 'What department do you want to add?',
            type: 'input',
            name: 'departmentName'
            }
        ])
        .then((res,err) => {
            if(err) throw err;
            connection.query(`INSERT INTO department(departmentName) VALUES ('${res.departmentName}')`,);
            console.table(res);
            viewDepartment();
            connectionPrompt();
        })
    
}

    function addRole() {
inquirer
        .prompt([
            {
                message: 'What is the role`s new title?',
                type: 'input',
                name: 'title'
            }
        ])
        .then((res,err) =>{
            if(err) throw err;
            connection.query(`INSERT INTO role(title) VALUES ('${res.title}')`,);
            console.table(res);
            viewRoles();
            connectionPrompt();
        })

    }

    function addEmployee() {
inquirer
        .prompt([
            {
                message: 'Who is the new Employee?',
                type: 'input',
                name: 'first_name last, last_name'
            }
        ])
        .then((res,err) =>{
            if(err) throw err;
            connection.query(`INSERT INTO employee(first_name, last_name) VALUES ('${res.first_name, last_name}')`,);
            console.table(res);
            viewEmployees();
            connectionPrompt();
        })
          }


connectionPrompt();