
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var footballTeamSchema = new Schema({
	'name': String,
	'president': String,
	'director': String,
	'coach': String,
	'logoPath': String
})

module.exports = mongoose.model('footballTeam', footballTeamSchema)
