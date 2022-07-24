const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../schemas/userSchema')

const registerUser = asyncHandler( async (req, res) => {
    const pass = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: pass,
    })

    //Are we supposed to set request header? Should we push to the user tokens array
    //and send it back to the client?
    const token = await user.generateJWT()
    req.headers.authorization =  token
    res.cookie('auth', token, {
        expires: new Date(Date.now() + (3600 * 1000 * 24)),
        path: '/',
        httpOnly: true,
        sameSite: true
    })
    res.status(200).send(user)
})

const loginUser = asyncHandler( async (req, res) => {
    const user = await User.findOne({
      username: req.body.username
    })

    let validated = false
    if (user) {
        validated = await bcrypt.compare(req.body.password, user.password)
    }
    
    if (validated){
        const token = await user.generateJWT()
        res.cookie('auth', token, {
            expires: new Date(Date.now() + (3600 * 1000 * 24)),
            path: '/',
            httpOnly: true,
            sameSite: true
        })
        res.status(200).send({user})
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

const logoutUser = asyncHandler ( async (req, res) => {
    const user = res.locals.user
    const token = req.cookies.auth
    const token_arr = []
    for (const element of user.tokens) {
        if (element !== token) token_arr.append(element)
    }
    console.log('Tokens before', user.tokens)

    user.tokens = token_arr
    console.log('Tokens After', user.tokens)
    await user.save()
    res.clearCookie('auth');
    res.status(200).send({success: 'Successfully logged out.'});
})

module.exports = {
    registerUser,
    loginUser,
    getUser,
    deleteUser,
    updateUser,
    logoutUser
}