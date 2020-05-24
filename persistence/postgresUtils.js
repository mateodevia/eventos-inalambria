const { Pool, Client } = require('pg');

const PostgresUtils = async () => {
    const config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    };
    const pool = new Pool(config);

    const res = await pool.query('SELECT * FROM public."Eventos"');

    let exports = {};

    return exports;
};

module.exports = PostgresUtils;
