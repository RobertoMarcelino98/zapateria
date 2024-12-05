const mysql = require('mysql2');

//configuracion de la bd
//host username, password y bd
const connection = mysql.createConnection({
    host: 'buth7uci6zbkm8gpygup-mysql.services.clever-cloud.com',
    user: 'ufovajwztqhh3cji',
    password: 'qW1RVqENGkn4gF1iqWwG',
    database: 'buth7uci6zbkm8gpygup'
});


//conectar a la bd
connection.connect((error) => {
    if (error)throw error;
    console.log('Conectado a la base de datos');
});

module.exports = connection;