/*
 * Parsed mongoose model - `user`
 * @revision undefined
 * @parser_version 0.0.5
 * @generated 2014-01-04T17:58:59.732Z
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
    "last_login": {
        "type": "date"
    },
    "last_ip": {
        "type": "text"
    },
    "allowed": {
        "type": "checkbox"
    },
    "verified": {
        "type": "checkbox"
    },
    "user_group": {
        "type": "text",
        "default": "Registered"
    },
    "added": {
        "type": "date",
        "default": "function () {return new Date();}"
    },
    "_id": {
        "type": "Text",
        "pk": true
    }
});
//]
//[patches
schema.last_ip.disabled = true;
schema.allowed.disabled = true;
schema.verified.disabled = true;


//patches]
 model.form.schema = schema;
exports = module.exports = model;