var mongoose = require('mongoose')
var Schema = mongoose.Schema

var standingSchema = new Schema({
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

module.exports = mongoose.model('standing', standingSchema)
