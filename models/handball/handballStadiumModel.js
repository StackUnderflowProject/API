var mongoose = require('mongoose')
var GeoJSON = require('mongoose-geojson-schema')
var Schema = mongoose.Schema

var handballStadiumSchema = new Schema({
	'name': String,
	'teamId': {
		type: Schema.Types.ObjectId,
		ref: 'handballTeam'
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

handballStadiumSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('handballStadium', handballStadiumSchema)
