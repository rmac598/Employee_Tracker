// Simple basic start up approach to Employee Tracker

const inquire = require("inquirer")
const mysql = require("mysql2") 

const prompt = () => {
    inquire.prompt ({
        type: "rawlist",
        name: "selection",
        message: "What would you like to do today?",
        choices: ['Would you like to view all employees?',
                'Are you interested in the departments?',
                'What roles are you looking for?',
                'Do you need to add an employee?',
                'Did someones role change?',
                'Is there a role that needs to be changed?',
                'Do you need to add a role?',
                'Guess nothing for today....Good Bye']
        }
        
)
.then((res) => {
    let selection = res.selection
    // function to query fro all employees and log the table
switch (selection) {
    case `view employees`:
        getAllEmployees();
        break;
    case `view roles`:
    getAllRoles();
    break;

    default:
        break;
}
})}


