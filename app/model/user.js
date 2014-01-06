var mongoose = require('mongoose');

var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);

var Schema = mongoose.Schema;

var Email = mongoose.SchemaTypes.Email;

var nameLength = function(v) {if(v.length < 4 || v.length > 50) { return false } return true;}
var nameError = 'Name length must be between 4 and 50 chars.';
var userSchema = new Schema({
	name: {
	    first: { 
	    	 type: String
	    	,required: true
	    	,trim: true
	    	,validate: [nameLength,nameError]
	    },
	    
	    middle: { 
	    	 type: String
	    	,required: false
	    	,trim: true
	    	,validate: [nameLength,nameError]
	    },	
	    
	    last: { type: String, required: true, trim: true, validate: [nameLength,nameError]}	
	},

	email: { 
		type: Email
		,unique: true
		,required: true
		,trim: true
		
	},	

	pass_hash: {type: String, disabled: true },
	pass_salt: {type: String, disabled: true },

	bio: {type: String, fulltext: true },

	last_login: Date,
	last_ip: String,
	
	age: {
		type: Number,
		min: 5,
		max: 120
	},
	gender: {
		type: String,
		enum: ['m','f','u']
	},
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