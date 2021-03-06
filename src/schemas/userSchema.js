const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        dropDups: true,
        trim: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)) 
                throw new Error("Invalid email.")
        }
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6
    },
    bodyStats: [{
        type: Schema.Types.ObjectId,
        ref: 'bodyStat'
    }],
    routines: [{
        type: Schema.Types.ObjectId,
        ref: 'routine',
    }],
    liftEntries: [{
        type: Schema.Types.ObjectId,
        ref: 'liftEntry'
    }],
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'workout'
    }],
    tokens: [String],
    createdAt: {
        type: Date,
        default: Date()
    }
})

userSchema.set('timestamps', true)

//Generates token to be sent to the client and stores it on the current User Object for authentication
userSchema.methods.generateJWT = async function() {
    const user = this
    const token = jwt.sign({data: user.id}, `${process.env.JWT_SECRET}`, {expiresIn: '24h'})
    user.tokens.push(token)
    await user.save()
    return token
}

module.exports = mongoose.model('user', userSchema)