"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = require('../db/sequelize');
// Define the Token model class extending Model and specifying attributes
class Token extends sequelize_1.Model {
    // Specify the Sequelize model attributes and configurations
    static initialize(sequelize) {
        return Token.init({
            userId: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
            },
            token: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Token', // Model name (optional)
            tableName: 'Token', // Table name in the database (optional)
            schema: 'user_schema', // Schema name (optional)
            timestamps: true, // Disable timestamps (created_at, updated_at)
        });
    }
}
// Initialize the Token model with the Sequelize instance
Token.initialize(sequelize);
// Export the Token model for usage in other modules
//exports.default = Token;
module.exports = Token;
