const mongoose = require('mongoose')
const Schema = mongoose.Schema

const handballStandingSchema = new Schema({
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
	'points': Number,
	'season': Number
})

module.exports = mongoose.model('handballStanding', handballStandingSchema)