const mongoose = require('mongoose');
const { Schema } = mongoose;

const BucketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    taggedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1]
    }
}, { timestamps: true})

module.exports = mongoose.model('Bucket', BucketSchema)