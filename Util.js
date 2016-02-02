'use strict';

module.exports.util = function(){
    var mkdirp = require('mkdirp');
    var fs = require('fs');
    var getDirName = require('path').dirname;
    
    return {
        generate_random_string: function(){
            return Math.random().toString(36).slice(2); 
        },
        writeFile: function(path, contents){
            mkdirp(getDirName(path), function(err){
                if (err) throw err;
                fs.writeFile(path, contents);
            });
        }
    }
    
}