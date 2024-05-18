import { DataTypes, Model, Optional } from 'sequelize';
const sequelize = require('../db/sequelize');

// Define the attributes of the Token model
interface TokenAttributes {
    userId: string;
    token: number;
}

// Define the Token creation attributes (optional attributes)
interface TokenCreationAttributes extends Optional<TokenAttributes, 'userId'> {}

// Define the Token model class extending Model and specifying attributes
class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
    public userId!: string;
    public token!: number;

    // Specify the Sequelize model attributes and configurations
    public static initialize(sequelize: any) {
        return Token.init(
            {
                userId: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                token: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Token', // Model name (optional)
                tableName: 'Token', // Table name in the database (optional)
                schema: 'user_schema', // Schema name (optional)
                timestamps: true, // Disable timestamps (created_at, updated_at)
            }
        );
    }
}

// Initialize the Token model with the Sequelize instance
Token.initialize(sequelize);

// Export the Token model for usage in other modules
export default Token;
