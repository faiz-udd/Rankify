const teacherRouter = require('./teachers');
const userRouter = require('./users');
const ratingRouter = require('./ratings');
const facultyRouter = require('./faculty');
const departmentRouter = require('./department');
const subjectRouter = require('./subjects');
const reviewRouter = require('./reviews');

module.exports = {
    teacherRouter,
    userRouter,
    ratingRouter,
    facultyRouter,
    departmentRouter,
    subjectRouter,
    reviewRouter
}