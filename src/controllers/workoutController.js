const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const Workout = require('../schemas/workoutSchema')
const liftEntry = require('../schemas/liftEntrySchema')
const liftEntrySchema = require('../schemas/liftEntrySchema')

const WorkoutController = {
    addWorkout: async (req, res) => {
        const user = res.locals.user
        const requestData = {owner: user._id}
        const validFields = ['name', 'notes']
        validFields.forEach((key) => {
            if(req.body[key]) requestData[key] = req.body[key]
        })

        const workout = await Workout.create(requestData)
        await workout.save()
        const validLiftFields = ['name', 'sets', 'reps', 'rpe', 'weight']

        for (const lift of req.body.lifts) {
            const liftData = {owner: user._id, workout: workout._id}
            validLiftFields.forEach((key) => {
                if(lift[key]) liftData[key] = lift[key]
            })
            const n_lift = await liftEntry.create(liftData)
            await n_lift.save()
            user.liftEntries.push(n_lift)
            workout.lifts.push(n_lift)
        }
        
        await workout.save()
        user.workouts.push(workout)
        await user.save()
        res.send(workout)
    },

    getWorkout: async (req, res) => {
        const workout = await Workout.findById(req.params.workoutID)
        await workout.populate('lifts')
        res.send(workout)
    },

    getWorkouts: async (req, res) => {
        const user = res.locals.user
        const workouts =( await user.populate('workouts')).workouts
        res.send(workouts)
    },

    removeWorkout: async (req, res) => {
        const workout = await Workout.findById(req.params.workoutID)
        const user = res.locals.user
        
        if (user._id.equals(workout.owner)) {
            await liftEntrySchema.deleteMany({workout: workout._id})
            await Workout.deleteOne({id: workout._id})
            res.send({message: 'Successfully deleted workout.'})
        }
        else {
            res.status(401).send({error: 'Unable to access this workout.'})
        }
    },

    updateWorkout: async (req, res) => {
        const workout = await Workout.findById(req.params.workoutID)
        const validUpdates = ['notes']
        if (user._id.equals(workout.owner)){
            validUpdates.forEach((key) => {
                if(req.body[key]) workout[key] = req.body[key]
            })
            await workout.save()
            res.send(workout)
        }
        else {
            res.status(401).send({error: 'Unable to access this workout.'})
        }
        

    }
}

module.exports = WorkoutController