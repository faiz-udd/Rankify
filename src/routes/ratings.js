const router = require('express').Router();

const { ratingController } = require('../controllers/index');

// all posts
router.post('/api/rating', ratingController.createRating);

// all gets                    // get ratings of a teacher 
router.get('/api/ratings/:teacherId', ratingController.getAllRatingsOfTeacher);



module.exports = router;



