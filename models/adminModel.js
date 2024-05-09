const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({  // zgolj 1 dokument v bazi
    adminGates: {type: Boolean, required: true}, // when set to true -> new user registered = admin
    users: {
        type: [{type: Schema.Types.ObjectId, ref: 'user'}],
        required: true,
    },
})

// Create and export the model
const admin = mongoose.model('admin', adminSchema)

module.exports = admin