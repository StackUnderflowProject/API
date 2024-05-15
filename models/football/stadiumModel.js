const mongoose = require('mongoose')
const Schema = mongoose.Schema

const footballStadiumSchema = new Schema({
	'name': String,
	'teamId': {
		type: Schema.Types.ObjectId,
		ref: 'footballTeam'
	},
	'capacity': Number,
	'location': {
		type: {type: String},
		coordinates: [Number],
		required: false
	},
	'buildYear': Number,
	'imageUrl': String,
	'season': Number
})

footballStadiumSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('footballStadium', footballStadiumSchema)