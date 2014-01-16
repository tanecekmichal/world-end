 /*
 * Prepared validators for model: `user`, action: `login`'
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
   [validators.required(),validators.minlength(false,6),validators.maxlength(false,20)] }
/*var filters = #filters#*/



exports = module.exports = function(req,res,next) {

	var errors = {};
	var validation_result;
	if(req.method == "POST" && req.body){
		validation_result = validate(req.body,validators); // [errors => Object || false,data => Object]
		if(validation_result[0] === false) {


		} else {
			// errors
			if(res.local.login === undefined) 
				res.locals.login = {}

			res.locals.login.errors = validation_result[0];
			res.locals.login.val = validation_result[1];
			return next();
		}

	}else{
		res.redirect(req.url)
	}
}