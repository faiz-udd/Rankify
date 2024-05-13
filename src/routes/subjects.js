const router = require('express').Router();
const { subjectController } = require('../controllers/index');
//all posts 

//all gets

router.get('/api/subjects/:id',subjectController.getAllSubjectsByDept);

// routes need to be added
//


module.exports = router; 