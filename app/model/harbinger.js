var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);


//var Email = mongoose.SchemaTypes.Email;
var Url = mongoose.SchemaTypes.Url;


var userSchema = require('./user').schema;

var harbingerSchema = new Schema({
	name: String,
	www: {
		type: Url
	},
	added: { type: Date, default: Date.now },
	source: {type: String, default: 'wiki'},
	wiki: Url,
	author: {
		type: Schema.Types.ObjectId,
		ref: userSchema,

		ref_to: ['user','email']
	},
}, { id: false });

var Harbinger = mongoose.model('Harbinger', harbingerSchema);



module.exports = exports = {
	schema: harbingerSchema,
	model: Harbinger
};