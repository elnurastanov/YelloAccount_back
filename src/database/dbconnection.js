import mysql from 'mysql'


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yello_account'
})

connection.connect((err) => {
    if (err){
        console.log(err);
    }else{
        console.log("DataBase Connected!");
    }
    
});

export default connection;