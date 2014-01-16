function validate(data,validators) {
	var errors = false;
	data = data || {};

	var fields = Object.keys(validators)
	var data_fields = Object.keys(data);

	fields.forEach(function(field){
		// single field
		if(Array.isArray(validators[field])) {
			validators[field].forEach(function(validator){
				var res = validator(data[field]);
				if(res[0]) { //err 
					if(errors === false)
						errors = {};
					if(!Array.isArray(errors[field]))
						errors[field] = [];
					errors[field].push(res[0])
				}
			})
		} else { // sub fields
			var temp = validate(data[field] || {},validators[field])
			if(temp[0] !== false) {
				if(errors === false)
					errors = {}
				errors[field] = temp[0]
			}
			data[field] = temp[1];

		}
		
	});

	data_fields.forEach(function(field){
		if(validators[field] === undefined) {
			delete data[field];
		}
	})
	return[errors,data]
}






exports = module.exports = validate;