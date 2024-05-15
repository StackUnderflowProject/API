
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const footballTeamSchema = new Schema({
	'name': String,
	'president': String,
	'director': String,
	'coach': String,
	'logoPath': String,
	'season': Number
})

module.exports = mongoose.model('footballTeam', footballTeamSchema)