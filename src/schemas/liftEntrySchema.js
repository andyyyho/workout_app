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
      type: Number
    },
    rpe: {
      type: Number
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
}, {
  timestamps: true
})

module.exports = mongoose.model('liftEntry', liftEntrySchema)