var html2jade = require('html2jade');
var util = require("util");
var Construct = require(__dirname+'/_construct');

var Checkbox = function(formName,obj) {
    this.formName = formName;
    this.data = obj || {};
    return this.init();  
}

util.inherits(Checkbox,Construct)

Checkbox.prototype.override = function() {
    this.options = {};
}

Checkbox.prototype.parser = function() {
    var tmpl = "<div class=\"#wrapper_class#\"><label for=\"#id#\">#label#</label><input name=\"#id#\" type=\"checkbox\" value=\"js\"id=\"#id#\"type=\"#type#\" class=\"#class#\" #opts#></input></div>";
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
    });
    return tmpl;
}
Checkbox.prototype.toJade = function(cb) {
    var self = this;  

    html2jade.convertHtml(self.parser(), {}, function (err, jade) {
        var field_naming = self.id;
        if(field_naming.match(/\[/)) {
            field_naming = field_naming.replace(/\[/g,'.').replace(/\]/g,'');
        }

        jade = [jade.replace(/^[^\n]*\n/m,'').replace(/^[^\n]*\n/m,'').replace(/(\x20){4}/gm,'').replace(/\x20{2}/gm,'\t').replace('value=\'js\'',"value="+self.formName+'.val.'+field_naming+'==="on" ? "on" : "off"')];
        if(self.tooltip) {
            jade.push('\n\tdiv.tooltip '+self.tooltip)
        }

        cb(err,jade.join(''));
        return;
    });
}

exports = module.exports = Checkbox;