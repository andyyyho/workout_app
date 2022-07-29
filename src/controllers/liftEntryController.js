const LiftEntry = require('../schemas/liftEntrySchema')


const LiftEntryController = {
    getEntries: async (req, res) => {
        const user = res.locals.user
        const lifts = (await user.populate('liftEntries')).liftEntries

        lifts.sort((a, b) => {
            if (a.createdAt > b.createdAt) return 1
            else return -1
        })
        
        res.status(200).send(lifts)
    },
    getFilteredEntries: async (req, res) => {
        const user = res.locals.user
        const requestedLift = req.params.requestedLift
        const lifts = (await user.populate('liftEntries')).liftEntries
        
        const filteredLifts = lifts.filter((lift) => lift.name === requestedLift)

        res.status(200).send(filteredLifts)
    },
    updateEntry: async (req, res) => {
        const user = res.locals.user
        const entry = await LiftEntry.findById(req.params.entryID)

        if ( user._id.equals(entry.owner) ){ 
            const validUpdates = ['name', 'rpe', 'reps', 'sets', 'weight']
            validUpdates.forEach((key) => {
                if(req.body[key]) entry[key] = req.body[key]
            })
            await entry.save()
            res.status(200).send(entry)
        }
        else {
            res.status(401).send("Unable to access this entry.")
        }
    },
    deleteEntry: async(req, res) => {
        const user = res.locals.user
        const entry = await LiftEntry.findById(req.params.entryID)

        if (user._id.equals(entry.owner)) {
            await LiftEntry.deleteOne( { id: entry.id } )
            res.send( { message: "Successfully deleted lift entry." } )
        } else {
            res.status(401).send( { error: "Unable to delete this lift." } )
        }
    }
}

module.exports = LiftEntryController