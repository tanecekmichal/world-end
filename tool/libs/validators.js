/**
 * varning: validators doesnt care types .. for example min length will works on string, array
 */


var util = require('util');
var vm = require('vm');

exports.number = function(msg) {
	if(!msg)
		msg = 'Value %s is not a number.';
	var validator = function(v) {
		if(/^-?\d+$/m.test(v)) {
			return[false,true]
		} else {
			return[util.format(msg,v),false]
		}
	}
	return validator.bind({msg:msg})
}

exports.inArray = function(msg,_array) {
	if(!_array || !Array.isArray(_array))
		throw new Error('Validator inArray require array of items as second argument.');
	if(!msg)
		msg = 'Option %s is not in allowed values: '+_array.join(', ')+'.';
	var validator = function(v) {
		if(_array.indexOf(v) === -1) {
			return [util.format(msg,v),false]
		} else {
			return [false,true]
		}
	}
	return validator.bind({msg:msg,_array:_array})
}

exports.email = function(msg,regexp) {
    // from package mongoose types .. for compatibility
    if(!regexp) 
    	regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!msg)
    	msg = 'Email %s is not valid (name@domain.tld).'
    var validator = function(v) {
    	if(regexp.test(v)) {
    		return [false,true];
    	} else {
    		return [util.format(msg,v),false]
    	}
    }
    return validator.bind({msg:msg,regexp:regexp})
}


exports.min = function(msg,min) {
	if(!msg) msg = 'Value must be bigger than %d.';
	var validator = function(v) {
		console.log(this)
		if(v < min) {
			return[util.format(msg,min),false]
		} else {
			return[false,true]
		}
	}
	return validator.bind({min:min,msg:msg})
}

exports.max = function(msg,max) {
	if(!msg) msg = 'Value must be lower than %d.';
	var validator = function(v) {
		if(v > max) {
			return[util.format(msg,max),false]
		} else {
			return[false,true]
		}
	}
	return validator.bind({max:max,msg:msg})

}

exports.minlength = function(msg,min) {
	if(!msg) msg = 'Value length must be more than %s.'
	var validator= function(v) {
		if(v===undefined || v.length < min) {
			return[util.format(msg,min),false]
		} else {
			return[false,true]
		}
	}
	return validator.bind({min:min,msg:msg})
}

exports.maxlength = function(msg,max) {
	if(!msg) msg = 'Value length must be less than %s.'
	var validator= function(v) {
		if(v===undefined ||v.length > max) {
			return[util.format(msg,max),false]
		} else {
			return[false,true]
		}
	}
	return validator.bind({max:max,msg:msg})
}

exports.required = function(msg) {
	if(!msg)
		msg = 'Field is required and can`t be empty.';
	var validator = function(v) {
		if(v === undefined || v === null || v.length ==0) {
			return[msg,false]
		} else {
			return [false,true]
		}
	}
	return validator.bind({msg:msg})
}
//exports.enum = exports.inArray;


/**
 * callback function generator
 * @stability unstable
 * @version 0.0.1
 * @todo rewrite testing
 */
exports.callback = function(fn,msg) {
	if(!msg) throw new Error('Provide error mesage for validator: '+fn.toString());
		
	var testObj = {res: false};
	
	var testContext = vm.createContext(testObj);
	
	vm.runInContext('res = '+fn+'(true)',testContext);
	
	if(!compareKeys(testContext,testObj)) {
		throw new Error('Callback validator is doing somenting messy!')
	}

	if(!(testContext.res === true || testContext.res === false)) {
		throw new Error('Callback validator is returning somenting messy! Exepting true or false (boolean).')
	}

	var validator = [];
	var template = [];
	validator.push('\tvar fn = '+fn+'\n')
	validator.push('\tvar msg ="'+msg+'";\n')
	validator.push('\tif(fn(v)) {\n')
	validator.push('\t\treturn[false,true];\n')
	validator.push('\t} else {\n');
	if(msg.match('%')) {
		template.push('var util = require(\'util\');\n\n')
		template.push('exports = module.exports =');
		validator.push('\t\treturn[util.format(msg,v),false];\n\t}')
	} else {
		template.push('exports = module.exports =');
		validator.push('\t\treturn[msg,false];\n\t}')
	}
	template.push(new Function('v',validator.join('')).toString())
	return template.join("");
}

function compareKeys(a, b) {
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}