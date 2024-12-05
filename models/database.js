import mysql from 'mysql2';

// Configuración de la base de datos
const connection = mysql.createConnection({
    host: 'bu8mu03ruhiuw6inbyav-mysql.services.clever-cloud.com',
    user: 'ux7yanqdxz1zug98',
    password: 'J6eq66QAvyFPnjdDiWnO',
    database: 'bu8mu03ruhiuw6inbyav'
});

// Conectar a la base de datos
connection.connect((error) => {
    if (error) throw error;
    console.log('Conectado a la base de datos');
});

export default connection;