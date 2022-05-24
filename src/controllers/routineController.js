const Routine = require('../schemas/routineSchema')

const RoutineController = {
    addRoutine: async (req, res) => {
        const user = res.locals.user
        const requestData = {owner: user}
        const validUpdates = ['name', 'lifts'] 
        validUpdates.forEach((key) => {
            if(req.body[key]) requestData[key] = req.body[key]
        })
        const routine = await Routine.create(requestData)
        user.routines.push(routine)
        await user.save()
        res.send(routine)
    },

    updateRoutine: async(req, res) => {
        const routine = await Routine.findById(req.params.routineID)
        const validUpdates = ['name', 'lifts']
        const updates = Object.keys(req.body)
        const validAction = updates.every((element) => {
          if (validUpdates.includes(element)) return true
        })
        if (validAction && res.locals.user.id == routine.owner) {
          updates.forEach((element) => {
            routine[element] = req.body[element]
          })
          await routine.save()
          res.send(routine)
        } else {
          res.status(401).send({error: "Unable to update routine."})
        }
        
    },
 
    removeRoutine: async (req, res) => {
       const routine = await Routine.findById(req.params.routineID)
       const user = res.locals.user
       const userRoutines = (await user.populate('routines')).routines

        if (user.id == routine.owner){
            user.routines = userRoutines.filter((element) => {
                return (routine !== element) 
            })
            await user.save()
            await Routine.deleteOne({id: routine.id})
            res.send({message: 'Successfully deleted routine.'})
        }
        else {
            res.status(401).send({error: 'Unable to access this routine.'})
        }
       
    },

    getRoutine: async (req, res) => {
        const routine = await Routine.findById(req.params.routineID)
        if (routine.owner.id == res.locals.user.id) res.send(routine)
        else res.status(401).send({error: 'Unable to access this routine.'}) 
        
    },

    getRoutines: async (req, res) => {
        const user = res.locals.user
        const routines = (await user.populate('routines')).routines
        res.send(routines)

        },
}

module.exports = RoutineController