const express = require('express');
const router = express.Router();
const users = require('../controller/usuarioController');

router.post('/altausuario', users.addUser);

router.post('/login', users.login);

module.exports = router;