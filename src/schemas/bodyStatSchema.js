const { Decimal128 } = require('mongodb')
const { Schema } = require('mongoose')

const bodyStatSchema = new Schema({
    weight: {
        type: Decimal128
    },
    bodyFat: {
        type: Decimal128
    },
    timestamps: true
})