const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const liftEntrySchema = new Schema({
    name: {
        type: String
    },
    sets: {
      type: Number
    },
    reps: {
      type: [ Number ]
    },
    rpe: {
      type: Number
    },
    weight: {
      type: [ Number ]
    }, 
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    workout: {
      type: Schema.Types.ObjectId,
      ref: "workout"
    },
    createdAt: {
      type: Date,
      default: new Date()
    }
})

module.exports = mongoose.model('liftEntry', liftEntrySchema)