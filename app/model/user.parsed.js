/*
 * Parsed mongoose model - `user`
 * @revision undefined
 * @parser_version 0.0.7
 * @generated 2014-01-05T01:16:56.806Z
 */

//[
var model = {};
var mongooseModel = require('../../app/model/user');
model.schema = mongooseModel.schema;
model.entity = mongooseModel.model;
model.form = {};
var schema = JSON.parse({
	"name": {
		"first": {
			"type": "text",
			"required": true,
			"filters": [
				"trim"
			],
			"validators": [
				null
			]
		},
		"middle": {
			"type": "text",
			"filters": [
				"trim"
			],
			"validators": [
				null
			]
		},
		"last": {
			"type": "text",
			"required": true,
			"filters": [
				"trim"
			]
		}
	},
	"email": {
		"type": "email",
		"required": true,
		"unique": true,
		"filters": [
			"trim"
		],
		"validators": [
			null
		]
	},
	"pass_hash": {
		"type": "text",
		"disabled": true
	},
	"pass_salt": {
		"type": "text",
		"disabled": true
	},
	"bio": {
		"type": "textarea"
	},
	"age": {
		"type": "number",
		"validators": [
			[
				"min",
				5
			],
			[
				"max",
				120
			]
		]
	},
	"gender": {
		"type": "select",
		"options": [
			"m",
			"f",
			"u"
		]
	},
	"allowed": {
		"type": "checkbox",
		"default": false
	},
	"verified": {
		"type": "checkbox",
		"default": false
	},
	"user_group": {
		"type": "text",
		"default": "Registered"
	},
	"added": {
		"type": "date",
		"default": "function() {return new Date()}"
	},
	"_id": {
		"type": "text",
		"pk": true
	}
});
//]
//[patches
schema.allowed.disabled = true;

//patches]
model.form.schema = schema;
exports = module.exports = model;