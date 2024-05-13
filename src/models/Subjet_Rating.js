const { Sequelize , DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const Subject_Rating = db.define('Subject_Rating', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
     },
    rating: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
  }, {
    schema: 'user_schema'
});

module.exports = Subject_Rating;
