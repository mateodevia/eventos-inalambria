const { Pool, Client } = require('pg');
require('dotenv').config();

const PostgresUtils = async () => {
    const config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    };

    const pool = new Pool(config);

    const res = await pool.query('SELECT * FROM public."Eventos"');

    console.log(res);
};

try {
    PostgresUtils();
} catch (err) {
    console.log('error: ', err);
}
