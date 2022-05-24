const mongoose = require('mongoose')
const { Schema } = mongoose


const routineSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    lifts: [{
        name: {
            type: String,
            required: true
        },
        sets: {
            type: Number,
            required: true
        },
        reps: {
            type: Number,
            required: true
        },
        rpe: {
            type: Number,
            default: -1
        }
    }]
})

module.exports = mongoose.model('routine', routineSchema)