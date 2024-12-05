const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// creamos un objeto llamado app que va a ser nuestro servidor
const app = express();
const usersRouters = require('./routes/usuarioRouter');
const zapatosRouters = require('./routes/zapateriaRouter');

//Middleware o un intermediario entre el cliente y el servidor
app.use(bodyParser.json()); // se establece el formato de los datos que se van a recibir

app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/users', usersRouters);
app.use('/zapato', zapatosRouters);
// app.use(express.static(path.join(__dirname, 'view')));

// Definir rutas
const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server running' + PORT);
});