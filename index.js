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
