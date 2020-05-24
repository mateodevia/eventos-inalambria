const PostgresUtils = require('../persistence/postgresUtils');
const postgresUtils = PostgresUtils();

module.exports.getEventos = async () => {
    try {
        return await postgresUtils.getEventos();
    } catch (err) {
        if (err.msg && err.detail) {
            throw err;
        } else {
            throw { msg: 'Error al consultar los eventos', detail: err };
        }
    }
};

module.exports.postEvento = async (
    nombre,
    organizador,
    fecha,
    cupos,
    descripcion,
    precio
) => {
    try {
        let response = await postgresUtils.postEvento(
            nombre,
            organizador,
            fecha,
            cupos,
            descripcion,
            precio
        );
        response.NOMBRE = nombre;
        response.ORGANIZADOR = organizador;
        response.FECHA = fecha;
        response.CUPOS = cupos;
        response.DESCRIPCION = descripcion;
        response.PRECIO = precio;
        return response;
    } catch (err) {
        if (err.msg && err.detail) {
            throw err;
        } else {
            throw { msg: 'Error al crear un evento', detail: err };
        }
    }
};

module.exports.updateEvento = async (
    id,
    nombre,
    organizador,
    fecha,
    cupos,
    descripcion,
    precio
) => {
    try {
        await postgresUtils.updateEvento(
            id,
            nombre,
            organizador,
            fecha,
            cupos,
            descripcion,
            precio
        );
        let response = {};
        response.NOMBRE = nombre;
        response.ORGANIZADOR = organizador;
        response.FECHA = fecha;
        response.CUPOS = cupos;
        response.DESCRIPCION = descripcion;
        response.PRECIO = precio;
        response.ID = id;
        return response;
    } catch (err) {
        if (err.msg && err.detail) {
            throw err;
        } else {
            throw { msg: 'Error al actualizar el evento', detail: err };
        }
    }
};
