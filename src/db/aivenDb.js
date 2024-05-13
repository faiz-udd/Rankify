const fs = require('fs');
const { Sequelize } = require('sequelize');
const path = require('path');

const caCertPath = path.resolve(__dirname, '../../other/ca.pem');
// Define the configuration object
const config = {
    host: process.env.AIVEN_DB_HOST,
    port: process.env.AIVEN_DB_PORT,
    database: process.env.AIVEN_DB_NAME,
    username: process.env.AIVEN_DB_USER,
    password: process.env.AIVEN_DB_PASSWORD,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
            // Read the CA certificate file
            ca: fs.readFileSync(caCertPath, 'utf-8')
        }
    },
    logging: console.log // Set to true if you want Sequelize to log queries
};

// Create the Sequelize instance using the configuration object
const sequelize = new Sequelize(config);

// // Test the connection
// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection to the database has been established successfully.');
//     })
//     .catch((error) => {
//         console.error('Unable to connect to the database:', error);
//     });

module.exports = sequelize;    
