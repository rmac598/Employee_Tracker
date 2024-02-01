// Simple basic start up approach to Employee Tracker

// get inquirer 


/* prompt with -- 
  List:
  - view employees
  - view departments
  - view roles
  - add employee
  - change role
  - add role
*/

// This will have the initial prompt for "What do you want to do?"
start();

/** ToDo --eventually I have a Join that shows the department name */
function getAllEmployees(params) {
    db.query(`select * from employees`,(err,results)=>{
        console.table(results);
        start();
    });
}

function getAllRoles(params) {
    db.query(`select * from roles`,(err,results)=>{
        console.table(results);
        start();
    })
}
// function to query fro all employees and log the table
switch (key) {
    case `view employees`:
        getAllEmployees();
        break;
    case `view roles`:
    getAllRoles();
    break;

    default:
        break;
}