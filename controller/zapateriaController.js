const bd = require('../models/database');
const multer = require('multer');
const path = require('path');

// Configuración de multer para guardar archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const addZapato = (req, res) => {
    const { nombre, marca, talla, precio, cantidad } = req.body;
    let imagen = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const query = 'INSERT INTO zapato (nombre, marca, talla, precio, cantidad, imagen) VALUES (?, ?, ?, ?, ?, ?)';
    bd.query(query, [nombre, marca, talla, precio, cantidad, imagen], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'Zapato added', data: result });
    });
};

const allZapatos = (req, res) => {
    const query = 'SELECT * FROM zapato';
    bd.query(query, (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'All zapatos', data: result });
    });
};

const getZapato = (req, res) => {
    const query = 'SELECT * FROM zapato WHERE id = ?';
    bd.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'Zapato not found' });
        }
        res.json({ success: true, message: 'Zapato found', data: result[0] });
    });
};

const updateZapato = (req, res) => {
    const { nombre, marca, talla, precio, cantidad } = req.body;
    let imagen = req.file ? req.file.path.replace(/\\/g, '/') : req.body.imagen;

    const query = 'UPDATE zapato SET nombre = ?, marca = ?, talla = ?, precio = ?, cantidad = ?, imagen = ? WHERE id = ?';
    bd.query(query, [nombre, marca, talla, precio, cantidad, imagen, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'Zapato updated', data: result });
    });
};

const deleteZapato = (req, res) => {
    const query = 'DELETE FROM zapato WHERE id = ?';
    bd.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'Zapato deleted', data: result });
    });
};

module.exports = {
    addZapato: [upload.single('imagen'), addZapato],
    allZapatos,
    getZapato,
    updateZapato: [upload.single('imagen'), updateZapato],
    deleteZapato
};