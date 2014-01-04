var fs = require('fs');



module.exports = dirExport;



dirExport.debug = process.env.NODE_ENV === 'development';

function dirExport(path, target, recursive) {
  var files = fs.readdirSync(path);
  var file, i, l = files.length;
  for(i=0; i < l; i++) {
    file = files[i];
    if(file === 'index.js') {
      // do nothing for self...
    } else if(file.substr(-3).toLowerCase() === '.js') {
      // regular javascript file

      file = file.substr(0, file.length-3);
      if(dirExport.debug)
        console.log('Loading %s in %s ...', file, path);
      target[file] = require(path+'/'+file);

    } else if(recursive && fs.statSync(path+'/'+file).isDirectory()) {

      // directory

      // try standart require first, then enumerate deep
      try {
        target[file] = require(path+'/'+file);
        if(dirExport.debug)
          console.log('Module loaded %s in %s ...', file, path);
      } catch(err) {
        dirExport(path+'/'+file, target[file] = {}, recursive);
      }

    }
  }
}