const router = require('express').Router();
const { reviewController } = require('../controllers/index');

//all posts
router.post('/api/review',reviewController.createReview);

//all gets
router.get('/api/reviews/:teacherId',reviewController.getAllReviewsOfTeacher);


module.exports = router;