var mongoose = require('mongoose');

var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);

var Schema = mongoose.Schema;

var Email = mongoose.SchemaTypes.Email;

var userSchema = new Schema({
	name: {
	    first: { type: String, required: true,trim: true},
	    middle: { type: String, required: false,trim: true},	
	    last: { type: String, required: true, trim: true}	
	},

	email: { type: Email, unique: true,required: true,lowercase: true,trim: true},	

	pass_hash: {type: String, disabled: true },
	pass_salt: {type: String, disabled: true },

	bio: {type: String, fulltext: true },

	last_login: Date,
	last_ip: String,

	allowed: {
		type: Boolean,
		default: false
	},
	verified: {
		type: Boolean,
		default: false
	},
	
	user_group: {
		type: String,
		default: 'Registered'
	},

	added: { type: Date, default: Date.now },
}, { id: false });

var User = mongoose.model('User', userSchema);

module.exports = exports = {
	schema: userSchema,
	model: User
};