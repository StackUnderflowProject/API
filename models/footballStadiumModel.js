var mongoose = require('mongoose')
var GeoJSON = require('mongoose-geojson-schema')
var Schema = mongoose.Schema

var footballStadiumSchema = new Schema({
	'name': String,
	'teamId': {
		type: Schema.Types.ObjectId,
		ref: 'footballTeam'
	},
	'capacity': Number,
	'location': {
		type: { type: String },
		coordinates: [Number],
		required: false
	},
	'buildYear': Number,
	'imageUrl': String
})

footballStadiumSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('footballStadium', footballStadiumSchema)
