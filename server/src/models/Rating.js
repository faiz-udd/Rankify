const { Sequelize , DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const Rating = db.define('Rating', {
    // Model attributes are defined here
    id: {
       type: DataTypes.UUID,
       primaryKey: true,
    },
    punctuality: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    subject_command: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    teaching_method: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    helping_attitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lab_interaction: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    is_role_model: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
  }, {
    schema: 'user_schema'
});

module.exports = Rating;
