const mongoose = require('mongoose')
const Schema = mongoose.Schema

const handballMatchSchema = new Schema({
	'date': Date,
	'time': String,
	'home': {
		type: Schema.Types.ObjectId,
		ref: 'handballTeam'
	},
	'away': {
		type: Schema.Types.ObjectId,
		ref: 'handballTeam'
	},
	'score': String,
	'location': String,
	'stadium': {
		type: Schema.Types.ObjectId,
		ref: 'handballStadium'
	},
	'season': Number
})

module.exports = mongoose.model('handballMatch', handballMatchSchema)