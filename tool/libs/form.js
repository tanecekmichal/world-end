var path = require('path')
require(path.normalize(__dirname+'/../../helpers/dirExport'))(__dirname+'/elements', module.exports, false);

exports.email = exports.input;
exports.text = exports.input;
exports.number = exports.input;
exports.password = exports.input;