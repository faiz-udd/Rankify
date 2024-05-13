const router = require('express').Router();
const { departmentController } = require('../controllers/index');
//all posts 

//all gets

router.get('/api/departments/:id?',departmentController.getAllDepartments);


module.exports = router; 