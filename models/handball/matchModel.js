var mongoose = require('mongoose')
var Schema = mongoose.Schema

var handballMatchSchema = new Schema({
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
	}
})

module.exports = mongoose.model('handballMatch', handballMatchSchema)
