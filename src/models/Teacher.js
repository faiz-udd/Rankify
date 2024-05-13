const { Sequelize , DataTypes } = require('sequelize');
const db = require('../db/sequelize');

const Teacher = db.define('Teacher', {
    // Model attributes are defined here
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    profile_picture: {
       type: DataTypes.STRING,
       allowNull:true
    },
    qualification: {
        type: DataTypes.STRING,
        allowNull:false 
    },
    designation: {
        type: DataTypes.STRING,
        allowNull:false
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull:false
    },
    original_profile: {
        type: DataTypes.STRING,
    }
  }, {
    schema: 'user_schema'
});

module.exports = Teacher;
