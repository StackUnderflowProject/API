var mongoose = require('mongoose')
var Schema = mongoose.Schema

var footballStandingSchema = new Schema({
	'place': Number,
	'team': {
		type: Schema.Types.ObjectId,
		ref: 'footballTeam'
	},
	'gamesPlayed': Number,
	'wins': Number,
	'draws': Number,
	'losses': Number,
	'goalsScored': Number,
	'goalsConceded': Number,
	'points': Number
})

module.exports = mongoose.model('footballStanding', footballStandingSchema)
