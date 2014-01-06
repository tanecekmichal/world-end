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
    var types = ['text','password','color','date','datetime','datetime-local','email','month','number','range','search','tel','time','url','week'];
    if(this.data.type && types.indexOf(this.data.type)) {
        this.type = this.data.type;
    } else {
        this.type = 'text';
    }
    return this;
}


Input.prototype.toJade = function(cb) {
    var tmpl = "<div class=\"#wrapper_class#\"><label for=\"#id#\">#label#</label><input name=\"#id#\" id=\"#id#\"type=\"#type#\" class=\"#class#\" #opts#></input></div>";
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
        jade = [jade.replace(/^[^\n]*\n/m,'').replace(/^[^\n]*\n/m,'').replace(/(\x20){4}/gm,'').replace(/\x20{2}/gm,'\t').replace('value=\'js\'','value='+self.formName+'.val.'+field_naming+'|| ""')];
        jade.push('\n\t-if(Array.isArray('+self.formName+'.errors.'+field_naming+')) {')
        jade.push('\n\t\tdiv.error=',self.formName+'.errors.'+field_naming+'.join(\'\\n\')')
        jade.push('\n\t-}')
        if(self.tooltip) {
            jade.push('\n\tdiv.tooltip '+self.tooltip)
        }

        cb(err,jade.join(''));
        return;
    });
}

exports = module.exports = Input;