const mysql = require('mysql2');

//configuracion de la bd
//host username, password y bd
const connection = mysql.createConnection({
    host: 'bu8mu03ruhiuw6inbyav-mysql.services.clever-cloud.com',
    user: 'ux7yanqdxz1zug98',
    password: 'J6eq66QAvyFPnjdDiWnO',
    database: 'bu8mu03ruhiuw6inbyav'
});


//conectar a la bd
connection.connect((error) => {
    if (error)throw error;
    console.log('Conectado a la base de datos');
});

module.exports = connection;