var mongoose = require('mongoose')
var Schema = mongoose.Schema

//Name, description, activity, date, time, location, array userjev za zanimanje, host user

var eventSchema = new Schema({
    'name': String,
    'description': String,
    'activity': String,
	'date': Date,
	'time': String,
	'score': String,
	'location': {
		type: {type: String},
		coordinates: [Number],
		required: false
	},
	'host': {type: Schema.Types.ObjectId, ref: "user", required: true},
    'followers': {type: [{type: Schema.Types.ObjectId, ref: 'user'}], required: true}
})

module.exports = mongoose.model('event', eventSchema)