const PostgresUtils = require('../persistence/postgresUtils');
const postgresUtils = PostgresUtils();

module.exports.postReserva = async (evento, usuario, cantidad) => {
    try {
        let response = await postgresUtils.postReserva(
            evento,
            usuario,
            cantidad
        );
        return response;
    } catch (err) {
        if (err.msg && err.detail) {
            throw err;
        } else {
            throw { msg: 'Error al crear la reserva', detail: err };
        }
    }
};

module.exports.getReservasByUser = async (usuario) => {
    try {
        return await postgresUtils.getReservasByUser(usuario);
    } catch (err) {
        if (err.msg && err.detail) {
            throw err;
        } else {
            throw { msg: 'Error al consultar las reservas', detail: err };
        }
    }
};
