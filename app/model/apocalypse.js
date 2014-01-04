var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var harbingerSchema = require('./harbinger');
var userSchema = require('./user');

var apocalypseSchema = new Schema({
	title: String,
	when: Date,
	text: String,
	harbinger: {
		type: Schema.Types.ObjectId,
		ref: harbingerSchema
		
	},
	harbinger_alt: String,

	wiki: String,
	
	_added: { type: Date, default: Date.now },
	_source: {type: String, default: 'wiki'},
	_author: String
  
});

var Apocalypse = mongoose.model('Apocalypse', apocalypseSchema);



module.exports = exports = Apocalypse;