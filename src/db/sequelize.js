const { Sequelize } = require('sequelize');

const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD
const db_name = process.env.DB_NAME 


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(db_name, db_user, db_pass, {
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 5, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (in milliseconds) that a connection can be idle before being released
    idle: 10000 // Maximum time (in milliseconds) that a connection can remain open in the pool
  }   
});


module.exports = sequelize;


// // AIVEN PG
// const fs = require('fs');
// const { Sequelize } = require('sequelize');
// const path = require('path');

// const caCertPath = path.resolve(__dirname, '../../other/ca.pem');

// // Define the configuration object
// const config = {
//     host: process.env.AIVEN_DB_HOST,
//     port: process.env.AIVEN_DB_PORT,
//     database: process.env.AIVEN_DB_NAME,
//     username: process.env.AIVEN_DB_USER,
//     password: process.env.AIVEN_DB_PASSWORD,
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: true,
//             // Read the CA certificate file
//             ca: fs.readFileSync(caCertPath, 'utf-8')
//         }
//     },
//     logging: false, // Set to true if you want Sequelize to log queries
//     pool: {
//           max: 10, // Maximum number of connections in the pool
//           min: 5, // Minimum number of connections in the pool
//           acquire: 30000, // Maximum time (in milliseconds) that a connection can be idle before being released
//           idle: 10000 // Maximum time (in milliseconds) that a connection can remain open in the pool
//         } 
// };

// // Create the Sequelize instance using the configuration object
// const sequelize = new Sequelize(config);

// // // Test the connection
// // sequelize.authenticate()
// //     .then(() => {
// //         console.log('Connection to the database has been established successfully.');
// //     })
// //     .catch((error) => {
// //         console.error('Unable to connect to the database:', error);
// //     });

// module.exports = sequelize;  

