const mysql = require('mysql');

//create connection direction
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'CYX@2021',
    port:'3306',
    database:'myblog'
})

//start the connection
con.connect()

//execute sql 
const sql = `select * from users `
con.query(sql, (err, result) => {
    if(err){
        console.error(err)
        return
    }
    console.log(result)
})

//close the connection to end process
con.end()