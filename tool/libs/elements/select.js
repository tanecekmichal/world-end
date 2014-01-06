var html2jade = require('html2jade');
var util = require("util");
var Construct = require(__dirname+'/_construct');


var Select = function(formName,obj) {
    this.formName = formName;
    this.data = obj || {};
    return this.init();  
}

util.inherits(Select,Construct)

Select.prototype.override = function() {
    this.options = {};
    return this;
}
Select.prototype.toJade = function(cb) {
    var tmpl = "<div class=\"#wrapper_class#\"><label for=\"#id#\">#label#</label><select name=\"#id#\" id=\"#id#\"type=\"#type#\" class=\"#class#\" #opts#>#options#</select></div>";
    var self = this;
    tmpl.match(/#.[a-z_\-]*#/gi).forEach(function(i){
        if(typeof self[i.replace(/#/g,'')] != 'undefined')
            if(i == '#opts#') {
                var g =[];
                Object.keys(self.opts).forEach(function(p){
                    g.push(p+'="'+self.opts[p]+'"');
                }) 
                tmpl = tmpl.replace(i,g.join(" ")) 
            } else if(i =='#options#') {
                var g = [];
                Object.keys(self.options).forEach(function(p){
                    if(self.defaultOption === p) {
                        g.push('<option value="',p,'" default=1>',self.options[p],'</option>');
                    } else {
                        g.push('<option value="',p,'">',self.options[p],'</option>');
                    }
                })
                tmpl = tmpl.replace(i,g.join("")) 
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
        
        jade =  jade.replace(/^[^\n]*\n/m,'')
                    .replace(/^[^\n]*\n/m,'')
                    .replace(/(\x20){4}/gm,'')
                    .replace(/\x20{2}/gm,'\t')
                    .replace(/\noption/gi,'\n\t\toption/') // indent error - option
                    .replace(/option\//g,'option'); // replace option/
        jade = [jade];
        jade.push('\n\t-if(Array.isArray('+self.formName+'.errors.'+field_naming+')) {')
        jade.push('\n\t\tdiv.error=',self.formName+'.errors.'+field_naming+'.join(\'.\\n\')')
        jade.push('\n\t-}')
        if(self.tooltip) {
            jade.push('\n\tdiv.tooltip '+self.tooltip)
        }

        cb(err,jade.join(''));
        return;
    });
}

exports = module.exports = Select;
