/*
 * Parsed mongoose model - `user`
 * @revision 0.0.1
 * @parser_version 0.0.6
 * @generated 2014-01-04T19:16:00.353Z
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
                "function (v) {if(v.length < 4) { return false } return true;}"
            ]
        },
        "middle": {
            "type": "text",
            "filters": [
                "trim"
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
            "lowercase",
            "trim"
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
            "function anonymous(v) {\nif (v <5) {return false;} else {return true;}\n}",
            "function anonymous(v) {\nif (v >120) {return false;} else {return true;}\n}"
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
        "default": "function anonymous() {\nreturn new Date()\n}"
    },
    "_id": {
        "type": "Text",
        "pk": true
    }
});
//]
//[patches
schema.allowed.disabled = true;

//patches]
model.form.schema = schema;
exports = module.exports = model;