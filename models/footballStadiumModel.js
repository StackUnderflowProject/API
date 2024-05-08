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
	location: {
		type: {
			type: String,
			enum: ['Point'], // Only allow 'Point' as type
			default: 'Point'
		},
		coordinates: {
			type: [Number], // Array of [longitude, latitude]
			required: false // Set to true if location is mandatory
		}
	},
	'buildYear': Number,
	'imageUrl': String
})

footballStadiumSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('footballStadium', footballStadiumSchema)
