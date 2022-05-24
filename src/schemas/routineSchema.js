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
    }
})

module.exports = mongoose.model('routine', routineSchema)