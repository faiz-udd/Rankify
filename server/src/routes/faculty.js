const router = require('express').Router();
const { facultyController } = require('../controllers/index');

// all posts

// all gets                    
router.get('/api/faculties', facultyController.getAllFaculties);



module.exports = router;



