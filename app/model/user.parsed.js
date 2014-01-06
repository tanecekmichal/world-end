/*
 * Parsed mongoose model - `user`
 * @revision undefined
 * @parser_version 0.0.9
 * @generated 2014-01-06T10:33:09.675Z
 */

//[
var model = {};
var mongooseModel = require('../../app/model/user');
model.schema = mongooseModel.schema;
model.entity = mongooseModel.model;
model.form = {};
var schema = {
	name: {
		first: {
			type: 'text',
			required: true,
			filters: ['trim'],
			validators: [
				['function (v) {if(v.length < 4 || v.length > 50) { return false } return true;}',
					'Name length must be between 4 and 50 chars.'
				]
			]
		},
		middle: {
			type: 'text',
			filters: ['trim'],
			validators: ['function (v) {if(v.length < 4 || v.length > 50) { return false } return true;}']
		},
		last: {
			type: 'text',
			required: true,
			filters: ['trim'],
			validators: ['function (v) {if(v.length < 4 || v.length > 50) { return false } return true;}']
		}
	},
	email: {
		type: 'email',
		required: true,
		unique: true,
		filters: ['trim']
	},
	pass_hash: {
		type: 'text',
		disabled: true
	},
	pass_salt: {
		type: 'text',
		disabled: true
	},
	bio: {
		type: 'textarea'
	},
	age: {
		type: 'number',
		validators: [
			['min', 'Value must be bigger than %i', 5],
			['max', 'Value must be less than %i', 120]
		]
	},
	gender: {
		type: 'select',
		options: ['m', 'f', 'u']
	},
	allowed: {
		type: 'checkbox',
		default: false
	},
	verified: {
		type: 'checkbox',
		default: false
	},
	user_group: {
		type: 'text',
		default: 'Registered'
	},
	added: {
		type: 'date',
		default: 'function() {return new Date()}'
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