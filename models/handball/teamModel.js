const mongoose = require('mongoose')
const Schema = mongoose.Schema

const handballTeamSchema = new Schema({
	'name': String,
	'president': String,
	'director': String,
	'coach': String,
	'logoPath': String,
	'season': Number
})

module.exports = mongoose.model('handballTeam', handballTeamSchema)