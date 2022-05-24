const asyncHandler = require('express-async-handler')
const BodyStat = require('../schemas/bodyStatSchema')


let BodyStatController = {
    addBodyStat: async (req, res) => {
        const user = res.locals.user
        const requestData = {owner: user}
        if (req.body.bodyFat) requestData.bodyFat = req.body.bodyFat
        if (req.body.weight) requestData.weight = req.body.weight
        const stat = await BodyStat.create(requestData)
        user.bodyStats.push(stat)
        await user.save()

        res.send(user)
    },
    
    updateBodyStat: async (req, res) => {
        const stat = await BodyStat.findById(req.params.bodyStatID)
        const validUpdates = ['weight', 'bodyFat']
        const updates = Object.keys(req.body)
        const validAction = updates.every(element => {
            if (validUpdates.includes(element)) return true
        })
        if (validAction && res.locals.user.id == stat.owner){
            updates.forEach(element => {
                stat[element] = req.body[element]
            })
            await stat.save()
            res.send(stat)
        }
        else{
            res.status(401).send({error: "Unable to update this body stat."})
        } 
    },
    
    removeBodyStat: async (req, res) => {
        const stat = await BodyStat.findById(req.params.bodyStatID)
        const user = res.locals.user
        const userBodyStats = (await user.populate('bodyStats')).bodyStats

        if (res.locals.user.id == stat.owner){
            const userStats = userBodyStats.filter((element) => {
                return (element.id.toString() !== stat.id)
            })
            user.bodyStats = userStats
            await user.save()
            await BodyStat.deleteOne({id: stat.id})    
            res.send({message: "Succesfully deleted body statistic.", user})
        } 
        else {
            res.status(401).send({error: "Unable to access this body statistic."})
        }
    },

    getBodyStat: async (req, res) => {
        const stat = await BodyStat.findById(req.params.bodyStatID)
        if (res.locals.user.id == stat.owner) res.send(stat)
        else res.status(404).send({error: "Unable to locate body statistic."})
    },
    
    getBodyStats: async (req, res) => {
        const user = res.locals.user
        const bodyStats = (await user.populate('bodyStats')).bodyStats
        const cleanData = []
        bodyStats.forEach((element) => {
            cleanData.push({
                weight: element.weight,
                bodyFat: element.bodyFat,
                createdAt: element.createdAt
            })
        })
        res.send(bodyStats)
    }
}


module.exports = BodyStatController