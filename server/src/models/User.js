const { Sequelize , DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const User = db.define('User', {
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
          },
          customValidator(value) {
            // Custom validation using regular expression
            const emailRegex = /^[a-zA-Z0-9._%+-]+@iiu\.edu\.pk$/;
            if (!emailRegex.test(value)) {
              throw new Error('Email must be in iiu.edu.pk domain');
            }
          },
        },
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    } ,
    isVerified: {
      type : DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {
    schema: 'user_schema'
});

module.exports = User;
