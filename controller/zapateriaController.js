const bd = require('../models/database');
const multer = require('multer');
const path = require('path');

// Configuración de multer para guardar archivos
const storage = multer.diskStorage({
    destination: function (_, _, cb) {
        cb(null, 'uploads/');
    },
    filename: function (_, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const addZapato = (req, res) => {
    const { nombre, marca, talla, precio, cantidad } = req.body;
    console.log('Imagen:', req.file);
    console.log('datos recibidos:', req.body);
    let imagen = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const query = 'INSERT INTO zapato (nombre, marca, talla, precio, cantidad, imagen) VALUES (?, ?, ?, ?, ?, ?)';
    bd.query(query, [nombre, marca, talla, precio, cantidad, imagen], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        res.json({ success: true, message: 'Zapato añadido', data: result });
    });
};

const allZapatos = (_, res) => {
    const query = 'SELECT * FROM zapato';
    bd.query(query, (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'Todos los zapatos', data: result });
    });
};

const getZapato = (req, res) => {
    const query = 'SELECT * FROM zapato WHERE id = ?';
    bd.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'Zapato no encontrado' });
        }
        res.json({ success: true, message: 'Zapato encontrado', data: result[0] });
    });
};

const updateZapato = (req, res) => {
    const { nombre, marca, talla, precio, cantidad } = req.body;
    console.log('Imagen:', req.file);
    console.log('datos recibidos:', req.body);
    let imagen = req.file ? req.file.path.replace(/\\/g, '/') : req.body.imagen;

    const query = 'UPDATE zapato SET nombre = ?, marca = ?, talla = ?, precio = ?, cantidad = ?, imagen = ? WHERE id = ?';
    bd.query(query, [nombre, marca, talla, precio, cantidad, imagen, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'Zapato actualizado', data: result });
        console.log('Zapato actualizado:', result);
    });
};

const deleteZapato = (req, res) => {
    const query = 'DELETE FROM zapato WHERE id = ?';
    bd.query(query, [req.params.id], (err, result) => {
        if (err)
            return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        res.json({ success: true, message: 'Zapato eliminado', data: result });
    });
};

module.exports = {
    addZapato: [upload.single('imagen'), addZapato],
    allZapatos,
    getZapato,
    updateZapato: [upload.single('imagen'), updateZapato],
    deleteZapato
};