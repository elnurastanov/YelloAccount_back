import mysql from 'mysql2'


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yello_account'
})

connection.connect((err) => {

    if (err) console.log(`Database connection Error => ${err}`)
    else console.log("DataBase Connected!");

});

export default connection;