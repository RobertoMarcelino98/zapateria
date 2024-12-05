const express = require('express');
const router = express.Router();
const zapato = require('../controller/zapateriaController');

router.post('/altazapato', zapato.addZapato);

router.get('/allzapatos', zapato.allZapatos);

router.get('/zapato/:id', zapato.getZapato);

router.put('/updatezapato/:id', zapato.updateZapato);

router.delete('/deletezapato/:id', zapato.deleteZapato);

module.exports = router;