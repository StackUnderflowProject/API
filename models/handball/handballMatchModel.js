var mongoose = require('mongoose')
var Schema = mongoose.Schema

var footballMatchSchema = new Schema({
	'date': Date,
	'time': String,
	'home': {
		type: Schema.Types.ObjectId,
		ref: 'footballTeam'
	},
	'away': {
		type: Schema.Types.ObjectId,
		ref: 'footballTeam'
	},
	'score': String,
	'location': String,
	'stadium': {
		type: Schema.Types.ObjectId,
		ref: 'footballStadium'
	}
})

module.exports = mongoose.model('footballMatch', footballMatchSchema)
