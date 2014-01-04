var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var harbingerSchema = new Schema({
  name: String,
  www: String,
  added: { type: Date, default: Date.now },
  source: {type: String, default: 'wiki'},
  wiki: String,
  author: String
});

var Harbinger = mongoose.model('Harbinger', harbingerSchema);



module.exports = exports = Harbinger;