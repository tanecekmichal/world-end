var html2jade = require('html2jade');
var util = require("util");
var Construct = require(__dirname+'/_construct');


var Input = function(formName,obj) {
    this.formName = formName;
    this.data = obj || {};
    return this.init();  
}

util.inherits(Input,Construct)


Input.prototype.override = function() {
    return this;
}


Input.prototype.toJade = function(cb) {
    var tmpl = "<input name=\"#id#\" id=\"#id#\"type=\"hidden\" #opts#></input>";
    var self = this;
    this.opts.value = "js"
    tmpl.match(/#.[a-z_\-]*#/gi).forEach(function(i){
        if(typeof self[i.replace(/#/g,'')] != 'undefined')
            if(i == '#opts#') {
                var g =[];
                Object.keys(self.opts).forEach(function(p){
                    g.push(p+'="'+self.opts[p]+'"');
                }) 
                tmpl = tmpl.replace(i,g.join(" ")) 
            } else {
                tmpl= tmpl.replace(i,self[i.replace(/#/g,'')])
            }
        else
            tmpl= tmpl.replace(i,'')
    })
    html2jade.convertHtml(tmpl, {}, function (err, jade) {
        var field_naming = self.id;
        if(field_naming.match(/\[/)) {
            field_naming = field_naming.replace(/\[/g,'.').replace(/\]/g,'');
        }
        jade = [jade.replace(/^[^\n]*\n/m,'').replace(/^[^\n]*\n/m,'').replace(/\x20{4}/gm,'\t').replace('value=\'js\'','value='+self.formName+'.val.'+field_naming+'|| ""')];
        cb(err,jade.join(''));
        return;
    });
}

exports = module.exports = Input;