const { Decimal128 } = require('mongodb')
const { Schema } = require('mongoose')

const bodyStatSchema = new Schema({
    weight: {
        type: Decimal128
    },
    bodyFat: {
        type: Decimal128
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    timestamps: true
})

module.exports = mongoose.model('bodyStat', bodyStatSchema)