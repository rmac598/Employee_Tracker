const inquire = require("inquirer");
const db = require("./db/connection");
const { response } = require("express");


const start = () => {
  inquire
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
      let selection = res.choices;
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
          changeRole().then(() => start());a
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
  inquire
    .prompt([
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

          prompt();
        }
      );
    });
}


function addRole() {
  inquire
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What do you want to call the new role?",
      },
    ])
    .then((userResponse) => {
      db.query(
        `INSERT into role SET ?`,
        {
          title: userResponse.newRole,
        },
        (err,) => {
          if (err) throw err;
          console.log(`\n ${userResponse.newRole} successfully added to database! \n`);

          prompt();
        }
      );
    });
}



start();
