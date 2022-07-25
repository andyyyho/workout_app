const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../schemas/userSchema')
const Routine = require('../schemas/routineSchema')

const registerUser = asyncHandler( async (req, res) => {
    const pass = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: pass,
    })

    const defaultRoutines = [
        {name: "Push",
        lifts:  [
                {name: "Bench Press", sets: 4, reps: 8, rpe: 7},
                {name: "Shoulder Press", sets: 3, reps: 10, rpe: 8},
                {name: "Cable Crossover", sets: 3, reps: 12, rpe: 9},
                {name: "Skullcrushers", sets: 3, reps: 12, rpe: 9},
                {name: "Lateral Raise", sets: 3, reps: 12, rpe: 8}
            ]
        },
        {name: "Pull",
        lifts: [
                {name: "Deadlift", sets: 3, reps: 4, rpe: 7},
                {name: "Pullups", sets: 4, reps: 6, rpe: 9},
                {name: "T-Bar Row", sets: 4, reps: 12, rpe: 7},
                {name: "Rope Facepull", sets: 4, reps: 12, rpe: 9},
                {name: "Bicep Curl", sets: 4, reps: 15, rpe: 9}
            ]
        },
        {name: "Legs",
        lifts: [
                {name: "Squat", sets: 4, reps: 6, rpe: 8},
                {name: "Leg Press", sets: 3, reps: 12, rpe: 8},
                {name: "Leg Extension", sets: 3, reps: 12, rpe: 9},
                {name: "Leg Curl", sets: 3, reps: 12, rpe: 9},
                {name: "Calf Raises", sets: 4, reps: 15, rpe: 8}
            ]
        }
    ]

    for (routine of defaultRoutines) {
        try {
            const routineData = {
                name: routine.name,
                owner: user._id,
                lifts: routine.lifts,
            }
            
            const routineToAdd = await Routine.create(routineData)
            user.routines.push(routineToAdd)
            await user.save()
        } catch(e) {
            console.log("Error when creating default routines: ", e)
        }
    }

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
        console.log(user)
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
        res.send({user})
    }
    else{
        res.status(401).send({error: "Can't do that"})
    }
})

const getUser = asyncHandler( async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })

    res.status(200).send({user})
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