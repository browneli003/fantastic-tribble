DROP IF TABLE EXISTS Employee;
DROP IF TABLE EXISTS Roles;
DROP IF TABLE EXISTS Department;


CREATE TABLE Employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    FIRST NAME VARCHAR(30)NOT NULL,
    LAST NAME VARCHAR(30)NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER NULL
);

CREATE TABLE Roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30)NOT NULL,
    salary DECIMAL(10)NOT NULL,
    department_id INTEGER NOT NULL
);

CREATE TABLE Department (
    id INTEGER PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
