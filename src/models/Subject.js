const { Sequelize , DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const Subject = db.define('Subject', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
     },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, {
    schema: 'user_schema'
});

module.exports = Subject;
