const router = require('express').Router();

const { userController } = require('../controllers/index');

router.post('/api/user/signup',userController.createUser);
router.post('/api/user/login',userController.login);

router.get('/api/user/:id',userController.getUserById);
router.get('/api/users',userController.getAllUsers);



module.exports = router;


