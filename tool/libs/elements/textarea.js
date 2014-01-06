var html2jade = require('html2jade');
var util = require("util");
var Construct = require(__dirname+'/_construct');


var Textarea = function(formName,obj) {
    this.formName = formName;
    this.data = obj || {};

    return this.init();  
}

util.inherits(Textarea,Construct)

Textarea.prototype.override = function() {
   return this;
}

Textarea.prototype.toJade = function(cb) {
    this.tmpl = "<div class=\"#wrapper_class#\"><label for=\"#id#\">#label#</label><textarea name=\"#id#\" id=\"#id#\" class=\"#class#\" #opts#></textarea></div>";
    var self = this;
    var tmpl = new String(this.tmpl)
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
        
        jade = [jade.replace(/^[^\n]*\n/m,'').replace(/^[^\n]*\n/m,'').replace(/(\x20){4}/gm,'').replace(/\x20{2}/gm,'\t')];
        jade.push('\n\t-if('+self.formName+'.val.'+field_naming+'&&'+self.formName+'.val.'+field_naming+'.length) {');
        jade.push('\n\t\t='+self.formName+'.val.'+field_naming+'.toString()')
        jade.push('\n\t-}')
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

exports = module.exports = Textarea;