const { Sequelize , DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const Faculty = db.define('Faculty', {
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

module.exports = Faculty;
