var Generic = function() {}

Generic.prototype.init = function() {
    this.type = 'text';
    this.id = '';
    this.label = '';
    this.class ='';
    this.wrapper_class = 'field';
    this.opts = [];
    this.tooltip = '';

    if(this.data.id) {
        this.id = this.data.id;
    }

    if(this.data.wrapper_class) {
        if(Array.isArray(this.data.wrapper_class)) {
            this.wrapper_class = this.data.wrapper_class.join(' ');
        } else if(typeof this.data.wrapper_class == 'string') {
            this.wrapper_class = this.data.wrapper_class
        } else {
          throw new Exception('Wrong type for wrapper_class, excepting array or string, but '+typeof this.data.wrapper_class+' givenn.');
        }
    }

    if(this.data.label) {
      this.label = this.htmlEscape(this.data.label);
    }

    if(this.data.class) {
        if(Array.isArray(this.data.class)) {
            this.class = this.data.class.join(' ');
        } else if(typeof this.data.class == 'string') {
            this.class = this.data.class
        } else {
          throw new Exception('Wrong type for class, excepting array or string, but '+typeof this.data.class+' givenn.');
        }
    }

    if(this.data.tooltip) {
        this.tooltip = this.htmlEscape(this.data.tooltip);
    }

    this.override();

}

Generic.prototype.override = function() {
    var types = ['text','password','color','date','datetime','datetime-local','email','month','number','range','search','tel','time','url','week'];
    if(this.data.type && types.indexOf(this.data.type)) {
        this.type = this.data.type;
    } else {
        this.type = 'text';
    }
    return this;
}

Generic.prototype.htmlEscape = (function () {
    'use strict';

    var rAmp = /&/g,
        rLt = /</g,
        rGt = />/g,
        rApos = /\'/g,
        rQuot = /\"/g,
        hChars = /[&<>\"\']/;

    var coerceToString = function (val) {
        return String(val || '');
    };

    var htmlEscape = function (str) {
        str = coerceToString(str);
        return hChars.test(str) ?
            str.replace(rAmp, '&amp;')
                .replace(rLt, '&lt;')
                .replace(rGt, '&gt;')
                .replace(rApos, '&#39;')
                .replace(rQuot, '&quot;') :
            str;
    };

    return htmlEscape;
}());

exports = module.exports = Generic;