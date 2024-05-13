const { Sequelize , DataTypes } = require('sequelize');
const db = require('../db/sequelize');


const Review = db.define('Review', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
     },
      review_text : {
        type: DataTypes.TEXT,
        allowNull: false
      }
}, {
    schema: 'user_schema'
});

module.exports = Review;