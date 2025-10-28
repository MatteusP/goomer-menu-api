require('dotenv').config({ path: '../../.env' });
    
const dbConfig = {
    username: process.env.DB_USER || 'goomer',
    password: process.env.DB_PASSWORD || 'goomer',
    database: process.env.DB_NAME || 'goomer_db',
    host: process.env.DB_HOST || 'db',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
};

module.exports = {
    development: dbConfig,
    test: dbConfig,
    production: dbConfig,
};