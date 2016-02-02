(function(){
    'use strict';
    
    describe('Util', function(){
        describe('WriteFile', function(){
            var fs = require('fs');
            var mkdirp = require("mkdirp")
            var Util = require('.././Util');
            var util = Util.util();
            var assert = require('assert');
            
            var fileName = util.generate_random_string();
            
            var isFile = false;
            
            before(function(done){
                util.writeFile("./temp/" + fileName + ".txt", fileName);
                setTimeout(done, 500);
            });
            
            it ("Writes a file", function(){
                fs.stat("./temp/" + fileName + ".txt", function(err, stats){
                    if (err) throw err;
                    isFile = stats.isFile();
                    assert.equal(true, isFile);
                });
            });
            
            it ("Writes proper content", function(){
                var data = fs.readFileSync("./temp/" + fileName + ".txt");
                assert.equal(true, (data.toString() === fileName));
            });
            
            after(function(done){
                fs.unlinkSync("./temp/" + fileName + ".txt");
                setTimeout(done, 100);
            });
        });
    });
})();