var inquirer = require('inquirer');
const cTable = require('console.table');


const connection = require('./config/connection')



connection.connect = () => {
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
          ]
        }
    ])
    .then(() => {
        if(choices === 'View all departments') {
            viewDepartment();
        }
        else if(choices === 'View all roles') {
            viewRoles();
        }
        else if(choices === 'View all employees') {
            viewEmployess();
        }
        else if(choices === 'Add a department') {
            addDepartment();
        }
        else if(choices === 'Add a role') {
            addRole();
        }
        else if(choices === 'Add an employee') {
            addEmployee();
        }
        else if(choices === 'Update employee role') {
            updateEmployee();
        }
    })
};

    viewDepartment = () => {
        const sql = 'SELECT * FROM Department';
        connection.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
        res.json({
            message: 'Showing all departments',
        })
        console.log(sql);
        })
    };

    viewRoles = () => {
        const sql = 'SELECT * FROM Roles';
        connection.query(sql, (err, res) =>{
            if (err) {
                throw err;
            }
        res.json({
            message: 'Showing all roles',
        })
        console.log(sql)
        })
    };

    viewEmployess = () => {
        const sql = 'SELECT * FROM Employee';
        connection.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
        res.json({
            message: 'Showing all employees',
            })
        console.log(sql)
        })
    };

    connection.connect();