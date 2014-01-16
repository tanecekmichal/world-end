 /*
 * Prepared validators for model: `user`, action: `register`'
 * @revision undefined\n'
 * @parser_version 0.0.2\n'
 * @generated 2014-01-15T23:30:05.998Z\n'
 */

var path= require("path");
var validators= require(path.normalize(__dirname+"/../../../../tool/libs/validators"));
var validate = require(path.normalize(__dirname+"/../../../../tool/libs/validate"));
var model = require(path.normalize(__dirname+'/../model/#model#'));
var validator= { email: [validators.required()', 'validators.email()],
  password: 
   [validators.required(),validators.minlength(false,6),validators.maxlength(false,20)],
  password2: 
   [validators.required(),validators.minlength(false,6),validators.maxlength(false,20)],
  name: 
   { first: 
      [validators.required(),require(__dirname+"/register_name_first_1.js")],
     middle: [require(__dirname+"/register_name_middle_1.js")],
     last: 
      [validators.required(),require(__dirname+"/register_name_last_1.js")] },
  gender: [validators.inArray(false,["m","f","u"])],
  age: 
   [validators.number(),validators.min("Value must be bigger than %i",5),validators.max("Value must be less than %i",120)],
  bio: [] }
/*var filters = #filters#*/



exports = module.exports = function(req,res,next) {

	var errors = {};
	var validation_result;
	if(req.method == "POST" && req.body){
		validation_result = validate(req.body,validators); // [errors => Object || false,data => Object]
		if(validation_result[0] === false) {


		} else {
			// errors
			if(res.local.register === undefined) 
				res.locals.register = {}

			res.locals.register.errors = validation_result[0];
			res.locals.register.val = validation_result[1];
			return next();
		}

	}else{
		res.redirect(req.url)
	}
}