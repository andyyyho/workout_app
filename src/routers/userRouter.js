const express = require('express');
const router = express.Router();
const { deleteUser, updateUser, getUser, registerUser, loginUser, logoutUser } = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')
const BodyStatController = require('../controllers/bodyStatController')
const RoutineController = require('../controllers/routineController')
const asyncHandler = require('express-async-handler');
const WorkoutController = require('../controllers/workoutController');
const LiftEntryController = require('../controllers/liftEntryController');

// Regular user routes

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/profile', auth, getUser)

router.patch('/edit', auth, updateUser)

router.delete('/delete', auth, deleteUser)

router.get('/logout', auth, logoutUser)

// Body statistic routes

router.post('/bodyStats', auth, asyncHandler(BodyStatController.addBodyStat))

router.get('/bodyStats', auth, asyncHandler(BodyStatController.getBodyStats))

router.get('/bodyStats/params', auth, asyncHandler(BodyStatController.getBodyStatByFilter))

router.get('/bodyStats/:bodyStatID', auth, asyncHandler(BodyStatController.getBodyStat))

router.patch('/bodyStats/:bodyStatID', auth, asyncHandler(BodyStatController.updateBodyStat))

router.delete('/bodyStats/:bodyStatID', auth, asyncHandler(BodyStatController.removeBodyStat))

// Routine routes

router.post('/routines', auth, asyncHandler(RoutineController.addRoutine))

router.get('/routines', auth, asyncHandler(RoutineController.getRoutines))

router.get('/routines/:routineID', auth, asyncHandler(RoutineController.getRoutine))

router.patch('/routines/:routineID', auth, asyncHandler(RoutineController.updateRoutine))

router.delete('/routines/:routineID', auth, asyncHandler(RoutineController.removeRoutine))

// Workout routes

router.post('/workouts', auth, asyncHandler(WorkoutController.addWorkout))

router.delete('/workouts/:workoutID', auth, asyncHandler(WorkoutController.removeWorkout))

router.get('/workouts/:workoutID', auth, asyncHandler(WorkoutController.getWorkout))

router.patch('/workouts/:workoutID', auth, asyncHandler(WorkoutController.updateWorkout))

router.get('/workouts', auth, asyncHandler(WorkoutController.getWorkouts))

// Lift Entry routes

router.get('/lifts/getEntries', auth, asyncHandler(LiftEntryController.getEntries))

router.get('/lifts/:requestedWorkout', auth, asyncHandler(LiftEntryController.getFilteredEntries))

router.patch('/lifts/:entryID', auth, asyncHandler(LiftEntryController.updateEntry))

router.delete('/lifts/:entryID', auth, asyncHandler(LiftEntryController.deleteEntry))

module.exports = router