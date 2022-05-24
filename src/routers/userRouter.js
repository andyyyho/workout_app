const express = require('express');
const router = express.Router();
const { deleteUser, updateUser, getUser, registerUser, loginUser } = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')
const BodyStatController = require('../controllers/bodyStatController')
const RoutineController = require('../controllers/routineController')
const asyncHandler = require('express-async-handler')

// Regular user routes

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/profile', auth, getUser)

router.patch('/edit', auth, updateUser)

router.delete('/delete', auth, deleteUser)

// Body statistic routes

router.post('/bodyStats', auth, asyncHandler(BodyStatController.addBodyStat))

router.get('/bodyStats', auth, asyncHandler(BodyStatController.getBodyStats))

router.get('/bodyStats/:bodyStatID', auth, asyncHandler(BodyStatController.getBodyStat))

router.patch('/bodyStats/:bodyStatID', auth, asyncHandler(BodyStatController.updateBodyStat))

router.delete('/bodyStats/:bodyStatID', auth, asyncHandler(BodyStatController.removeBodyStat))

// Routine routes

router.post('/routines', auth, asyncHandler(RoutineController.addRoutine))

router.get('/routines', auth, asyncHandler(RoutineController.getRoutines))

router.get('/routines/:routineID', auth, asyncHandler(RoutineController.getRoutine))

router.patch('/routines/:routineID', auth, asyncHandler(RoutineController.updateRoutine))

router.delete('/routines/:routineID', auth, asyncHandler(RoutineController.removeRoutine))

module.exports = router