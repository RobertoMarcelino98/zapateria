const mysql = require('mysql2');

//configuracion de la bd
//host username, password y bd
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zapateria'
});


//conectar a la bd
connection.connect((error) => {
    if (error)throw error;
    console.log('Conectado a la base de datos');
});

module.exports = connection;