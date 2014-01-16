 /*
 * Prepared validators for model: `#model#`, action: `#action#`'
 * @revision #revision#\n'
 * @parser_version #parser_version#\n'
 * @generated #iso#\n'
 */

var path= require("path");
var validators= require(path.normalize(__dirname+"/../../../../tool/libs/validators"));
var validate = require(path.normalize(__dirname+"/../../../../tool/libs/validate"));
var model = require(path.normalize(__dirname+'/../model/#model#'));
var validator= #validators#
/*var filters = #filters#*/



exports = module.exports = function(req,res,next) {

	var errors = {};
	var validation_result;
	if(req.method == "POST" && req.body){
		validation_result = validate(req.body,validators); // [errors => Object || false,data => Object]
		if(validation_result[0] === false) {


		} else {
			// errors
			if(res.local.#action# === undefined) 
				res.locals.#action# = {}

			res.locals.#action#.errors = validation_result[0];
			res.locals.#action#.val = validation_result[1];
			return next();
		}

	}else{
		res.redirect(req.url)
	}
}