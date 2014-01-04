var config = require(__dirname + '/config/config.json');
var app = require('./app');
var mongoose = require('mongoose');


function ts() { return (new Date).toISOString(); }
// TimeZone set
if(typeof config.app.timeZone)
  	process.env.TZ = config.app.timeZone;

// ENV mode set [development,staging,production]
if(typeof config.app.env_mode) 
	process.env.NODE_ENV = config.app.env_mode | 'production';

// process.title set - (for pidof,ps)
if(typeof config.app.process_name) 
	process.title = config.app.process_name;

process.on('exit', function(){
  console.log('\n%s: Process exited', ts());
});


mongoose.connect('mongodb://localhost/we');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error'));
//mongoose.connection.once('open', function callback () {});
var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);

console.log("%s: Process %d start (Timezone: %s)", ts(), process.pid, process.env.TZ);    
app(config);

var gotSignal = function(signal) {
  console.log('\n%s: Got signal %s, exiting...', ts(), signal);
  process.exit();
};


// Exit signals
['INT', 'TERM', 'QUIT', 'PWR', 'ABRT'].forEach(function(signal_name) {
  var signal = 'SIG'+signal_name;
  process.on(signal, gotSignal.bind(null, signal));
});