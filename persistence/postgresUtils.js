const { Pool, Client } = require('pg');

const PostgresUtils = () => {
    const config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    };
    const pool = new Pool(config);

    let exports = {};

    exports.getEventos = async () => {
        try {
            const res = await pool.query(
                `SELECT "EVENTOS"."ID", "EVENTOS"."NOMBRE", "EVENTOS"."ORGANIZADOR", "EVENTOS"."FECHA", "EVENTOS"."CUPOS", "EVENTOS"."DESCRIPCION", "EVENTOS"."PRECIO", "USUARIOS"."USUARIO", "EVENTOS"."IMAGEN"
                FROM "EVENTOS"
                INNER JOIN "USUARIOS" ON "EVENTOS"."ORGANIZADOR" = "USUARIOS"."ID"`
            );

            return res.rows;
        } catch (err) {
            throw {
                msg: 'Error en el acceso a la base de datos',
                detail: err.detail,
            };
        }
    };

    exports.updateEvento = async (
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
            console.log(`UPDATE "EVENTOS"
            SET "NOMBRE"='${nombre}', "ORGANIZADOR"=${organizador}, "FECHA"='${fecha}', "CUPOS"=${cupos}, "DESCRIPCION"='${descripcion}', "PRECIO"=${precio}, "IMAGEN"='${imagen}'
            WHERE "ID"=${id}`);

            const res = await pool.query(
                `UPDATE "EVENTOS"
                SET "NOMBRE"='${nombre}', "ORGANIZADOR"=${organizador}, "FECHA"='${fecha}', "CUPOS"=${cupos}, "DESCRIPCION"='${descripcion}', "PRECIO"=${precio}, "IMAGEN"='${imagen}'
                WHERE "ID"=${id};`
            );
            return res.rows[0];
        } catch (err) {
            throw {
                msg: 'Error en el acceso a la base de datos',
                detail: err.detail,
            };
        }
    };

    exports.postEvento = async (
        nombre,
        organizador,
        fecha,
        cupos,
        descripcion,
        precio
    ) => {
        try {
            const res = await pool.query(
                `INSERT INTO "EVENTOS"(
                "NOMBRE", "ORGANIZADOR", "FECHA", "CUPOS", "DESCRIPCION", "PRECIO")
                VALUES ('${nombre}', ${organizador}, '${fecha}', ${cupos}, '${descripcion}', ${precio})
                RETURNING "ID"`
            );
            return res.rows[0];
        } catch (err) {
            throw {
                msg: 'Error en el acceso a la base de datos',
                detail: err.detail,
            };
        }
    };

    exports.getReservasByUser = async (usuario) => {
        try {
            const res = await pool.query(
                `SELECT "RESERVAS"."ID", "RESERVAS"."ID_EVENTO", "RESERVAS"."ID_USUARIO", "RESERVAS"."CANTIDAD", "EVENTOS"."NOMBRE", "EVENTOS"."DESCRIPCION", "EVENTOS"."FECHA", "EVENTOS"."IMAGEN"
                FROM "RESERVAS"
                INNER JOIN "EVENTOS" ON "RESERVAS"."ID_EVENTO" = "EVENTOS"."ID"
                WHERE "RESERVAS"."ID_USUARIO" = ${usuario}`
            );

            return res.rows;
        } catch (err) {
            throw {
                msg: 'Error en el acceso a la base de datos',
                detail: err.detail,
            };
        }
    };

    exports.postReserva = async (evento, usuario, cantidad) => {
        try {
            const res = await pool.query(
                `INSERT INTO public."RESERVAS"(
                    "ID_EVENTO", "ID_USUARIO", "CANTIDAD")
                SELECT ${evento}, ${usuario}, ${cantidad}
                WHERE ((SELECT sum("CANTIDAD")
                    FROM "RESERVAS"
                    WHERE "ID_EVENTO" = ${evento}) + ${cantidad} <= (SELECT "CUPOS" FROM "EVENTOS" WHERE "ID" = ${evento}))
                    OR (((SELECT count(*)
                    FROM "RESERVAS"
                    WHERE "ID_EVENTO" = ${evento})) = 0 AND (SELECT "CUPOS" FROM "EVENTOS" WHERE "ID" = ${evento}) >= ${cantidad})`
            );

            if (res.rowCount == 0) {
                throw { detail: 'No hay suficientes Cupos' };
            }

            return 'Reserva Realizada';
        } catch (err) {
            throw {
                msg: 'Error en el acceso a la base de datos',
                detail: err.detail,
            };
        }
    };

    exports.getUsuario = async (usuario) => {
        try {
            const res = await pool.query(
                `SELECT *
                FROM "USUARIOS"
                WHERE "USUARIO" = '${usuario}'`
            );

            return res.rows[0];
        } catch (err) {
            throw {
                msg: 'Error en el acceso a la base de datos',
                detail: err,
            };
        }
    };

    exports.postUsuario = async (usuario, nombre, contraseña, sal) => {
        try {
            const res = await pool.query(
                `INSERT INTO "USUARIOS"(
                "USUARIO", "NOMBRE", "CONTRASEÑA", "SAL")
                VALUES ('${usuario}', '${nombre}', '${contraseña}', '${sal}')
                RETURNING "ID"`
            );
            console.log(res);

            return res.rows[0];
        } catch (err) {
            throw {
                msg: 'Error en el acceso a la base de datos',
                detail: err.detail,
            };
        }
    };

    return exports;
};

module.exports = PostgresUtils;
