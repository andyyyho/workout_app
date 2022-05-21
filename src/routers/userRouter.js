const express = require('express');
const router = express.Router();
const { deleteUser, updateUser, getUser, registerUser, loginUser } = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')
const BodyStatController = require('../controllers/bodyStatController')
const asyncHandler = require('express-async-handler')


router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/profile', auth, getUser)

router.patch('/edit', auth, updateUser)

router.delete('/delete', auth, deleteUser)

router.post('/bodyStats', auth, asyncHandler(BodyStatController.addBodyStat))

router.get('/bodyStats', auth, asyncHandler(BodyStatController.getBodyStats))

module.exports = router