/*
 * Parsed mongoose model - `harbinger`
 * @revision undefined
 * @parser_version 0.0.9
 * @generated 2014-01-06T10:37:55.292Z
 */

//[
var model = {};
var mongooseModel = require('../../app/model/harbinger');
model.schema = mongooseModel.schema;
model.entity = mongooseModel.model;
model.form = {};
var schema = {
	www: {
		type: 'url'
	},
	added: {
		type: 'date',
		default: 'function() {return new Date()}'
	},
	source: {
		type: 'text',
		default: 'wiki'
	},
	author: {
		type: 'text',
		ref: ['user', 'email']
	},
	_id: {
		type: 'text',
		pk: true
	}
};
//]
//[patches


//patches]
model.form.schema = schema;
exports = module.exports = model;