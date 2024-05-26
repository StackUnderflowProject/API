const mongoose = require('mongoose')
const Schema = mongoose.Schema

const handballStadiumSchema = new Schema({
	'name': String,
	'teamId': {
		type: Schema.Types.ObjectId,
		ref: 'handballTeam'
	},
	'location': {
		type: { type: String },
		coordinates: [Number],
		required: false
	},
	'season': Number
})

handballStadiumSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('handballStadium', handballStadiumSchema)