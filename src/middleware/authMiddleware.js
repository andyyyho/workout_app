const jwt = require('jsonwebtoken')
const User = require('../schemas/userSchema')

const auth = async (req, res, next) => {
    const header = req.headers['authorization']
    try {
        const token = header.split(' ')[1]
        const decoded = await jwt.verify(token, `${process.env.JWT_SECRET}`)
        const user = await User.findById(decoded.data)
        for (const prop of user.tokens) {
            if (prop === token) {
                res.locals.user = user
                return next()
            }
        }
    }
    catch(e){
        res.status(401).send({error: 'Please log in.'})
    }
    
}

module.exports = auth