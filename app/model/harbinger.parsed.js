/*
 * Parsed mongoose model - `harbinger`
 * @revision undefined
 * @parser_version 0.0.7
 * @generated 2014-01-04T22:44:47.636Z
 */

//[
var model = {};
var mongooseModel = require('../../app/model/harbinger');
model.schema = mongooseModel.schema;
model.entity = mongooseModel.model;
model.form = {};
var schema = JSON.parse({
	"www": {
		"type": "url"
	},
	"added": {
		"type": "date",
		"default": "function anonymous() {\nreturn new Date()\n}"
	},
	"source": {
		"type": "text",
		"default": "wiki"
	},
	"author": {
		"type": "text",
		"ref": [
			"user",
			"email"
		]
	},
	"_id": {
		"type": "text",
		"pk": true
	}
});
//]
//[patches


//patches]
model.form.schema = schema;
exports = module.exports = model;