const bcrypt = require('bcrypt');

const testPassword = async () => {
    const password = 'f6eMr&N%+Mm4Hb';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Contraseña original:', password);
    console.log('Contraseña hasheada:', hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Resultado de la comparación:', isMatch);
};

testPassword();