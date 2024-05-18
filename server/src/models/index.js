const { Sequelize, DataTypes } = require('sequelize')

const User = require('./User');
const Teacher = require('./Teacher');
const Rating = require('./Rating');
const Review = require('./Review');
const Subject_Rating = require('./Subjet_Rating');
const Faculty = require('./Faculty');
const Department = require('./Department');
const Subject = require('./Subject');

// Define Associations
User.hasMany(Rating, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
}); // Each user can submit multiple ratings
Rating.belongsTo(User); // Each rating is submitted by a user

Department.hasMany(Subject, {
    onDelete: "CASCADE",
    foreignKey: {
        type: DataTypes.UUID,
        allowNull:false
    }
});

Subject.belongsTo(Department);


// User and Dept relation
Department.hasMany(User, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
}); // need to fix this later , give it fk
User.belongsTo(Department);


Teacher.hasMany(Rating, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
}); // Each teacher can receive multiple ratings
Rating.belongsTo(Teacher); // Each rating is associated with a teacher


Teacher.hasMany(Subject_Rating, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
}); // Each teacher can receive multiple subject_ratings
Subject_Rating.belongsTo(Teacher); // Each subject_rating is associated with a teacher

Subject.hasMany(Subject_Rating, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

Subject_Rating.belongsTo(Subject);

Subject_Rating.hasMany(Rating, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
}); // Each rating can be associated with a subject
Rating.belongsTo(Subject_Rating); // Each subject rating can have multiple ratings

User.hasMany(Review, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
}); // Each user can submit multiple reviews
Review.belongsTo(User); // Each review is submitted by a user

// Abuse Reviews Will be deleted so,, and other fields dont need to remove for now.
Teacher.hasMany(Review, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
}); // Each teacher can receive multiple reviews
Review.belongsTo(Teacher); // Each review is associated with a teacher


// Teacher and dept relation.

Department.hasMany(Teacher, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

Teacher.belongsTo(Department);



// Faculty Dept Relation.

Faculty.hasMany(Department, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

Department.belongsTo(Faculty);

module.exports = {
    User,
    Teacher,
    Review,
    Rating,
    Subject_Rating,
    Subject,
    Faculty,
    Department
};