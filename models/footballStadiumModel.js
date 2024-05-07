var mongoose = require('mongoose')
var Schema = mongoose.Schema

var footballStadiumSchema = new Schema({
	'name': String,
	'teamId': {
		type: Schema.Types.ObjectId,
		ref: 'footballTeam'
	},
	'capacity': Number,
	'location': String,
	'buildYear': Number,
	'imageUrl': String
})

module.exports = mongoose.model('footbalStadium', footballStadiumSchema)
