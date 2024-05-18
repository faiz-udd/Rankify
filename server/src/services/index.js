const teacherService = require('./teachers');
const facultyService = require('./faculty');
const departmentService = require('./departments');
const userService = require('./user');
const ratingService = require('./rating');
const reviewService = require('./review');
const subjectRatingService = require('./subject_rating');
const subjectService = require('./subject');



module.exports = {
    teacherService,
    facultyService,
    departmentService,
    userService,
    ratingService,
    reviewService,
    subjectRatingService,
    subjectService
}