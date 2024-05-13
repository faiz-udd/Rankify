const { Sequelize , DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const Admin = db.define('Admin', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Invalid email format',
          }
        },
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    } 
  }, {
    schema: 'user_schema'
});

module.exports = Admin;
