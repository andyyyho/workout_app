const BodyStat = require('../schemas/bodyStatSchema')


const BodyStatController = {
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
        const page = req.query.p || 0
        const statsPerPage = 2
        const bodyStats = await BodyStat.find( {owner: user} )
            .sort( { id: 1} )
            .skip( page * statsPerPage )
            .limit( statsPerPage )

        res.send(bodyStats)
    },
    
    getBodyStatByFilter: async(req, res) => {
        const user = res.locals.user
        const requested = req.query.request
        const page = req.query.p || 0
        const statsPerPage = 2

        if (requested != 'weight' && requested != 'bodyfat') {
            res.status(401).send('Unable to process this request.')
        }

        const bodyStats = await BodyStat.find( {owner: user} )
            .sort( { id: 1} )
            .skip( page * statsPerPage )
            .limit( statsPerPage )
        
        const filteredBodyStats = []
        for (const bodyStat of bodyStats) {
            if (bodyStat[requested]) {
                filteredBodyStats.push( { requested: bodyStat[requested], createdAt: bodyStat.createdAt } )
            }
        }

        res.send(filteredBodyStats)
    },
}


module.exports = BodyStatController