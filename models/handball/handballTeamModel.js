
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var handballTeamSchema = new Schema({
	'name': String,
	'president': String,
	'director': String,
	'coach': String,
	'logoPath': String
})

module.exports = mongoose.model('handballTeam', handballTeamSchema)
