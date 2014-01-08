exports = module.exports = function anonymous(v) {
	var fn = function (v) {if(v.length < 4 || v.length > 50) { return false } else {return true;}}
	var msg ="Name length must be between 4 and 50 chars.";
	if(fn(v)) {
		return[false,true];
	} else {
		return[msg,false];
	}
}