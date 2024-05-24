const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const Subject_Rating = db.define('Subject_Rating', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    schema: 'user_schema',
    hooks: {
        afterFind: (result) => {
            if (Array.isArray(result)) {
                result.forEach(item => {
                    item.rating = Math.trunc(item.rating / 2);
                });
            } else if (result) {
                result.rating = Math.trunc(result.rating / 2);
            }
        }
    }
});

module.exports = Subject_Rating;

