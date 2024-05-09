var mongoose = require('mongoose')
var Schema = mongoose.Schema

var handballStandingSchema = new Schema({
	'place': Number,
	'team': {
		type: Schema.Types.ObjectId,
		ref: 'handballTeam'
	},
	'gamesPlayed': Number,
	'wins': Number,
	'draws': Number,
	'losses': Number,
	'goalsScored': Number,
	'goalsConceded': Number,
	'points': Number
})

module.exports = mongoose.model('handballStanding', handballStandingSchema)
