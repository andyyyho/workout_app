const asyncHandler = require('express-async-handler')
const BodyStat = require('../schemas/bodyStatSchema')


let BodyStatController = {
    addBodyStat: async (req, res) => {
        let user = res.locals.user
        const requestData = {owner: user}
        if (req.body.bodyFat) requestData.bodyFat = req.body.bodyFat
        if (req.body.weight) requestData.weight = req.body.weight
        const stat = await BodyStat.create(requestData)
        user.bodyStats.push(stat)
        await user.save()
        res.send(user)
    },
    
    updateBodyStat: asyncHandler( async (req, res) => {
        
    }),
    
    removeBodyStat: asyncHandler( async (req, res) => {
        
    }),
    
    getBodyStats: asyncHandler( async (req, res) => {
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
        res.send(cleanData)
    })
}


module.exports = BodyStatController