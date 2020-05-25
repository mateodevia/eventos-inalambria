const PostgresUtils = require('../persistence/postgresUtils');
const postgresUtils = PostgresUtils();
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

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
    precio,
    imagen,
    resolve,
    reject
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

        cloudinary.v2.uploader.upload(
            imagen.tempFilePath,
            {
                folder: '/chatcenter',
            },
            async (err, res2) => {
                if (err) {
                    console.log(err);
                }
                try {
                    let myurl = res2.url.replace('http', 'https');
                    await postgresUtils.updateEvento(
                        response.ID,
                        nombre,
                        organizador,
                        fecha,
                        cupos,
                        descripcion,
                        precio,
                        myurl
                    );
                    resolve(response);
                } catch (err2) {
                    console.log('Error al enviar archivo a cloudinary: ', err2);
                }
            }
        );
    } catch (err) {
        if (err.msg && err.detail) {
            reject(err);
        } else {
            reject({ msg: 'Error al crear un evento', detail: err });
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
    precio,
    imagen
) => {
    try {
        await postgresUtils.updateEvento(
            id,
            nombre,
            organizador,
            fecha,
            cupos,
            descripcion,
            precio,
            imagen
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
