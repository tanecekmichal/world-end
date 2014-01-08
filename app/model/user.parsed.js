/*
 * Parsed mongoose model - `user`
 * @revision undefined
 * @parser_version 0.0.9
 * @generated 2014-01-08T02:01:17.346Z
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
				['function (v) {if(v.length < 4 || v.length > 50) { return false } else {return true;}}',
					'Name length must be between 4 and 50 chars.'
				]
			]
		},
		middle: {
			type: 'text',
			filters: ['trim'],
			validators: [
				['function (v) {if(v.length < 4 || v.length > 50) { return false } else {return true;}}',
					'Name length must be between 4 and 50 chars.'
				]
			]
		},
		last: {
			type: 'text',
			required: true,
			filters: ['trim'],
			validators: [
				['function (v) {if(v.length < 4 || v.length > 50) { return false } else {return true;}}',
					'Name length must be between 4 and 50 chars.'
				]
			]
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
['verified','user_group','added','allowed'].forEach(function(i){
	schema[i].disabled = true;
})

schema.password = {
	type: 'password',
	required: true,
	validators: [
		['minlength',false,6],
		['maxlength',false,20]
	]
}
schema.password2 = {
	type: 'password',
	required: true,
	validators: [
		['minlength',false,6],
		['maxlength',false,20],
		['same',false,'password']
	]
}


model.form.actions = {
	register : {
		type: 'add',
		fields : ['email','password','password2','name','gender','age','bio']
	},
	login: {
		type: 'sd',
		fields: ['email','password']
	}
}

//patches]
model.form.schema = schema;
exports = module.exports = model;