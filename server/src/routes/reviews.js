const router = require('express').Router();
const { reviewController } = require('../controllers/index');
const { userAuth } = require('../middlewares/auth/index')
//all posts
router.post('/api/review',userAuth,reviewController.createReview);

//all gets
router.get('/api/reviews/:teacherId',reviewController.getAllReviewsOfTeacher);


module.exports = router;