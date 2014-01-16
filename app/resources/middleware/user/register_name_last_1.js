var util = require('util');

exports = module.exports =function anonymous(v) {
	var fn = function (v) {if(v === undefined || v.length < 4 || v.length > 50) { return false } else {return true;}}
	var msg ="Name %s length must be between 4 and 50 chars.";
	if(fn(v)) {
		return[false,true];
	} else {
		return[util.format(msg,v),false];
	}
}