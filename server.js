const inquirer = require("inquirer");
const db = require("./db/connection.js");
//const { response } = require("express");


const start = () => {
  inquirer
    .prompt({
      type: "rawlist",
      name: "selection",
      message: "What would you like to do today?",
      choices: [
        {
          name: "Would you like to view all employees?",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Are you interested in the departments?",
          value: "VIEW_DEPARTMENT"
        },
        { name: "What roles are you looking for?", value: "VIEW_ROLES" },
        { name: "Do you need to add an employee?", value: "ADD_EMPLOYEE" },
        { name: "Did someones role change?", value: "CHANGE_ROLE" },
        { name: "Did you need to add a departmen?", value: "ADD_DEPARTMENT" },
        { name: "Do you need to add a role?", value: "ADD_ROLE" },
      ],
    })
    .then((res) => {
      let selection = res.selection;
      // function to query fro all employees and log the table
      switch (selection) {
        case `VIEW_EMPLOYEES`:
          getAllEmployees().then(() => start());
          break;
        case `VIEW_ROLES`:
          getAllRoles().then(() => start());
          break;
        case `VIEW_DEPARTMENT`:
          getAllDepartments().then(() => start());
          break;
        case `ADD_EMPLOYEE`:
          addEmployee().then(() => start());
          break;
        case `CHANGE_ROLE`:
          changeRole().then(() => start());
          break;
        case `ADD_DEPARTMENT`:
          addDepartment().then(() => start());
          break;
        case `ADD_ROLE`:
          addRole().then(() => start());
          break;

        default:
       
      }
    });
};

/** ToDo --eventually I have a Join that shows the department name */
function getAllEmployees() {
  db.query(`SELECT * from employee`, (err, results) => {
    if (err) throw err;
    console.table(results);  
  
});
}

function getAllRoles() {
  db.query(`SELECT * from role`, (err, results) => {
    if (err) throw err;
    console.table(results);
  
  });
}

function getAllDepartments() {
  db.query(`SELECT * from department`, (err, results) => {
    if (err) throw err;
    console.table(results);
  
  });
}

function addDepartment() {
  inquirer
    .start([
      {
        name: "newDepartment",
        type: "input",
        message: "What do you want to call this department?",
      },
    ])
    .then((userResponse) => {
      db.query(
        `INSERT into department SET ?`,
        {
          name: userResponse.newDepartment,
        },
        (err,) => {
          if (err) throw err;
          console.log(`\n ${userResponse.newDepartment} successfully added to database! \n`);

          start();
        }
      );
    });
}


addRole = () => {
  db.query(`SELECT * FROM department;`, (err, res) => {
      if (err) throw err;
      let departments = res.map(department => ({name: department.name, value: department.id }));
      inquirer.start([
          {
          name: 'title',
          type: 'input',
          message: 'What is the name of the role you want to add?'
          },
          {
          name: 'salary',
          type: 'input',
          message: 'What is the salary of the role you want to add?'
          },
          {
          name: 'departmentName',
          type: 'rawlist',
          message: 'Which department do you want to add the new role to?',
          choices: departments
          },
      ]).then((response) => {
          db.query(`INSERT INTO role SET ?`, 
          {
              title: response.title,
              salary: response.salary,
              department_id: response.departmentName,
          },
          (err, res) => {
              if (err) throw err;
              console.log(`\n ${response.title} successfully added to database! \n`);
             start();
          })
      })
  })
};
function addEmployee() {
  inquirer
    .start([
      {
        name: "newFirstName",
        type: "input",
        message: "What is the first name of the new employee?"
      },
      {
        name: "newLasttName",
        type: "input",
        message: "What is the last name of the new employee?"
      },
      {
        name: "newRoleId",
        type: "input",
        message: "What role are they in?(number)",
      },
      {
      name: "newManagerId",
      type: "input",
      message: "Who is their manager?(manager id number)",
      },
      
    ])
    .then((userResponse) => {
      db.query(
        `INSERT into employee SET ?`,
        {
          first_name: userResponse.newFirstName,
          last_name: userResponse.newLastName,
          role_id: userResponse.newRoleId,
          manager_id: userResponse.newManagerId
        },
        (err,) => {
          if (err) throw err;
          console.log(`\n ${userResponse.newFirstName} successfully added to database! \n`);

          start();
        }
      );
    });
}


start();
