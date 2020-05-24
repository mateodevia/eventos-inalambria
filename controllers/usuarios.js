const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const randomBytes = require('randombytes');
const PostgresUtils = require('../persistence/postgresUtils');
const postgresUtils = PostgresUtils();

let generateToken = (usuario) => {
    const data = {
        usuario: usuario,
    };
    const signature = process.env.SECRET;
    const expiration = '8h';
    return jwt.sign({ data }, signature, { expiresIn: expiration });
};

module.exports.postUsuario = async (usuario, contraseña, nombre) => {
    try {
        const salt = randomBytes(32);
        let hash = await argon2.hash(contraseña, { salt });
        let result = await postgresUtils.postUsuario(
            usuario,
            nombre,
            hash,
            salt.toString('hex')
        );
        let token = generateToken(usuario);

        return { token: token, usuario: usuario, id: result.ID };
    } catch (err) {
        if (err.msg && err.detail) {
            throw err;
        } else {
            throw { msg: 'Error en al crear un usuario', detail: err };
        }
    }
};
