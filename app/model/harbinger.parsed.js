/*
 * Parsed mongoose model - `harbinger`
 * @revision undefined
 * @parser_version 0.0.8
 * @generated 2014-01-05T02:45:53.380Z
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
		"default": "function() {return new Date()}"
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