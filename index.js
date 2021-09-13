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
        const sql = `SELECT * FROM Department`;
        connection.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
        res.json({
            message: 'Showing all departments',
        })
        console.table(sql);
        })
    };

   function viewRoles() {
        const sql = `SELECT * FROM Roles`;
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

    function viewEmployees() {
        const sql = `SELECT * FROM Employee`;
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

    function addDepartment() {
        const errors = inputCheck(body, 'name');
        if (errors) {
          res.status(400).json({ error: errors });
          return;
        }
        const sql = `INSERT INTO Department(name)
        VALUES(?)`;
        const params = [body.name];
        connection.query(sql, params, (err, res) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            res.json({
              message: 'Department added'
            });
            console.table(res)
          })
    }

    function addRole() {
        const sql = `INSERT INTO Role(title, salary, department_id)
        VALUES(?,?,?)`;
        const params = [body.title, body.salary, body.department_id]
        connection.query(sql, params,(err, res) => {
            if (err) {
                res.status(400).json({ error: err.message});
                return;
            }
            res.json({
                message: 'Role added'
            });
            console.table(res)
        })

    }

    function addEmployee() {
        connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
            // console.log(res)
             if (err) throw err
             console.log(res)
            inquirer.prompt([
                  {
                    name: "lastName",
                    type: "rawlist",
                    choices: function() {
                      var lastName = [];
                      for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                      }
                      return lastName;
                    },
                    message: "What is the Employee's last name? ",
                  },
                  {
                    name: "role",
                    type: "rawlist",
                    message: "What is the Employees new title? ",
                    choices: selectRole()
                  },
              ]).then(function(val) {
                var roleId = selectRole().indexOf(val.role) + 1
                connection.query("UPDATE employee SET WHERE ?", 
                {
                  last_name: val.lastName
                   
                }, 
                {
                  role_id: roleId
                   
                }, 
                function(err){
                    if (err) throw err
                    console.table(val)
                })
          
            });
          });
        
          }

    function updateRole() {

    }
