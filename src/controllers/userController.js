const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../schemas/userSchema')

const registerUser = asyncHandler( async (req, res) => {
    const pass = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: pass,
    })
    req.headers.authorization =  await user.generateJWT()
    res.status(200).send(user)
})

const loginUser = asyncHandler( async (req, res) => {
    const user = await User.findOne({
      email: req.body.username
    })
    
    if (bcrypt.compare(req.body.password, user.password)){
        const token = await user.generateJWT()
        res.status(200).send({user, token})
    }
    else 
        res.send('Failed Authentication')
})

const updateUser = asyncHandler( async (req, res) => {
    const validUpdates = ['name', 'email', 'password']
    const updates = Object.keys(req.body)

    const validAction = updates.every(element => {
        return validUpdates.includes(element)
    });
    if (validAction){
        updates.forEach(element => {
            res.locals.user[element] = req.body[element]
        })
        await res.locals.user.save()
        res.send({success: "Sucessfully updated.", user: res.locals.user})
    }
    else{
        res.status(401).send({error: "Can't do that"})
    }
})

const getUser = asyncHandler( async (req, res) => {
    res.send(res.locals.user.email)
})

const deleteUser = asyncHandler( async (req, res) => {
    try {
        if (bcrypt.compare(req.body.password, res.locals.user.password)) {
        await User.deleteOne({email: res.locals.user.email})
            res.send({success: 'Successfully deleted account'})
        }
    } catch(e) {
        res.status(401).send(e)
    }
})

module.exports = {
    registerUser,
    loginUser,
    getUser,
    deleteUser,
    updateUser
}