const mongoose = require('mongoose')
const { Schema } = mongoose

const workoutSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    lifts: [{
        type: Schema.Types.ObjectId,
        ref: "liftEntry"
    }],
    name: {
        type: String
    },
    notes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('workout', workoutSchema)