var  express = require("express")
	,urls = require('./urls')
	;



module.exports = exports = function(config) {
	var app = express();
	
	app.set('views', __dirname + './views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser(config.app.cokkies_secret));
	app.use(express.session());

	if(process.env.NODE_ENV == 'development') {
		app.use(connect.logger('dev'));
	}

	
	app.config = config;
	urls(app);

	app.use(express.static(__dirname + '/public'));
	app.listen(config.http.port);
	
	console.log('App `%s` listening on port %d',config.app.name, config.http.port + '.');

	
}
