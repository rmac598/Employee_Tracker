const inquire = require("inquirer");
const db = require("./db/connection");

function quit() {
  console.log("guess i am not doing anything today");
  process.exit();
}

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
      let selection = res.selection;
      // function to query fro all employees and log the table
      switch (selection) {
        case `VIEW_EMPLOYEES`:
          getAllEmployees();
          break;
        case `VIEW_ROLES`:
          getAllRoles();
          break;
        case `VIEW_DEPARTMENT`:
          getAllDepartments();
          break;
        case `ADD_EMPLOYEE`:
          getAddEmployee();
          break;
        case `CHANGE_ROLE`:
          getChangeRole();
          break;
        case `ADD_DEPARTMENT`:
          getAddDepartment();
          break;
        case `ADD_ROLE`:
          getAddRole();
          break;

        default:
          quit();
      }
    });
};

/** ToDo --eventually I have a Join that shows the department name */
function getAllEmployees() {
  db.query(`SELECT * from employee`, (err, results) => {
    if (err) throw err;
    console.table(results);
  
    start();
});
}

function getAllRoles() {
  db.query(`SELECT * from role`, (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function getAllDepartments() {
  db.query(`SELECT * from department`, (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
}

start();
