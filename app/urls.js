var baucis = require('baucis');

var routes = require('./routes');
//var models = require('./model');


module.exports = function(app) {

    // homepage
    app.get('/', routes.index);
    // ----------------- 

    // api
    var user = require('./model/user')
    var harbinger = require('./model/harbinger')


    baucis.rest('User')
    baucis.rest('Harbinger')
    app.use('/api', baucis({ swagger: true }));

    // ----------------- 

};