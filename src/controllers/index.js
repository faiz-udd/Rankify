const teacherController = require('./teachers');
const userController = require('./users');
const ratingController = require('./rating');
const facultyController = require('./faculty');
const departmentController = require('./department');
const subjectController = require('./subjects');
const reviewController = require('./reviews');

module.exports = {
    teacherController,
    userController,
    ratingController,
    facultyController,
    departmentController,
    subjectController,
    reviewController
}