'use strict';

module.exports.util = function(){
    var mkdirp = require('mkdirp');
    var fs = require('fs');
    var getDirName = require('path').dirname;
    
    return {
        generate_random_string: function(){
            return Math.random().toString(36).slice(2); 
        },
        writeFile: function(path, contents, format){
            mkdirp(getDirName(path), function(err){
                if (err) throw err;
                if (typeof format !== 'undefined'){
                    fs.writeFileSync(path, contents, format);
                }
                else{
                    fs.writeFileSync(path, contents);
                }
            });
        }
    }
    
}