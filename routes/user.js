const router = require('express').Router();
const userController = require('../controllers/user');


// Middleware
const { verifyToken, authorize } = require('../middlewares/auth');



router.get('/getUsers', verifyToken, authorize('ADMIN'), userController.getUsers)

router.post('/addUser', verifyToken, authorize('ADMIN'), userController.addUser)




module.exports = router;