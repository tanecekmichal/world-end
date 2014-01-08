var util = require('util');
var vm = require('vm');

exports.min = function(min,msg) {
	if(!msg) msg = 'Value must be bigger than %s.';

	return function(v) {
		if(v < min) {
			return[util.format(msg,min),false]
		} else {
			return[false,true]
		}
	}

}

exports.max = function(max,msg) {
	if(!msg) msg = 'Value must be lower than %s.';

	return function(v) {
		if(v > min) {
			return[util.format(msg,min),false]
		} else {
			return[false,true]
		}

	}
}

exports.minlength = function(min,msg) {
	if(!msg) msg = 'Value length must be more than %s.'
	return function(v) {
		if(v.length < min) {
			return[util.format(msg,min),false]
		} else {
			return[false,true]
		}
	}
}

exports.maxlength = function(max,msg) {
	if(!msg) msg = 'Value length must be less than %s.'
	return function(v) {
		if(v.length > min) {
			return[util.format(msg,min),false]
		} else {
			return[false,true]
		}
	}
}

exports.enum = function(arr,msg) {
	if(!msg) msg = 'Value must be one of following: %s';
	return function(v) {
		if(v.indexOf(arr) === -1) {
			return[util.format(msg,arr.join(', ')),false]
		} else {
			return[false,true]
		}
	}

}

exports.callback = function(fn,msg) {
	if(!msg) throw new Error('Provide error mesage for validator: '+fn.toString());
	//var fn = fn.toString();
	//var args = fn.match(/\([^\)]*/)[0].replace(/\(|\x20|\r|\n|\t/,'').split(',')
	//var body = fn.match(/\{(.|[\r\n\t])*\}/)[0]
	//	.replace(/^(\x20|[\r\n\t])*\{(\x20|[\r\n\t])*/,'')
	//	.replace(/(\x20|[\r\n\t])*\}(\x20|[\r\n\t])*$/,'')
	//	.replace(/[\r\n\t]*/,'')
	
	//var validator = new Function(args[0],body).toString().replace(/\n/g,'\n\t');
	
	var testObj = {res: false};
	var testContext = vm.createContext(testObj);
	
	vm.runInContext('res = '+fn+'(true)',testContext);
	
	if(!compareKeys(testContext,testObj)) {
		throw new Error('Callback validator is doing somenting messy!')
	}

	if(!(testContext.res === true || testContext.res === false)) {
		throw new Error('Callback validator is returning somenting messy! Exepting true or false (boolean).')
	}

	validator = [];

	validator.push('\tvar fn = '+fn+'\n')
	validator.push('\tvar msg ="'+msg+'";\n')
	validator.push('\tif(fn(v)) {\n')
	validator.push('\t\treturn[false,true];\n')
	validator.push('\t} else {\n');
	if(msg.match('%'))
		validator.push('\t\treturn[util.format(msg,v),false];\n\t}')
	else
		validator.push('\t\treturn[msg,false];\n\t}')
	return 'exports = module.exports = '+new Function('v',validator.join('')).toString()
	//return validator.join('');
}

function compareKeys(a, b) {
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}