const bd = require('../models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = '&!gLH-9*338QSaBMZEcm%dJN6b##!2Yh-ZWVZC6Kxeb83G=3+LF2QcA_^7zuDHw-';

const addUser = async (req, res) => {
    const { nombre, apellido_p, apellido_m, correo, contrasena, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    console.log('Contraseña original:', contrasena);
    console.log('Contraseña hasheada:', hashedPassword);
    const query = 'INSERT INTO usuario (nombre, apellido_p, apellido_m, correo, contrasena, rol) VALUES (?, ?, ?, ?, ?, ?)';
    bd.query(query, [nombre, apellido_p, apellido_m, correo, hashedPassword, rol], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'User added', data: result });
    });
};

const login = (req, res) => {
    const { correo, contrasena } = req.body;
    console.log('Correo recibido:', correo);
    console.log('Contraseña recibida:', contrasena);
    const query = 'SELECT * FROM usuario WHERE correo = ?';
    bd.query(query, [correo], async (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        if (result.length === 0) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
        }
        const user = result[0];
        console.log('Contraseña almacenada:', user.contrasena);
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        console.log('Resultado de la comparación:', isMatch);
        if (!isMatch) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
        const token = jwt.sign({ id: user.id, correo: user.correo, rol: user.rol }, secretKey, { expiresIn: '1h' });
        res.json({ success: true, message: 'User logged', token: token, data: user });
    });
};

module.exports = {
    addUser,
    login,
};

// genera un json para agregar un usuario

// {
//     "nombre": "Juan",
//     "apellido_p": "Perez",
//     "apellido_m": "Gomez",
//     "correo": "juan.p@prueba.com",
//     "contrsena": "123456",
//     "rol": "usuario"
// }