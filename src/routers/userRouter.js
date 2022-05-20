const express = require('express');
const router = express.Router();
const { deleteUser, updateUser, getUser, registerUser, loginUser } = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')


router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/profile', auth, getUser)

router.patch('/edit', auth, updateUser)

router.delete('/delete', auth, deleteUser)

module.exports = router