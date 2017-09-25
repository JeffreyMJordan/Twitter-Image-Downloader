var fs = require('fs'),
    request = require('request');

exports.download = function(uri, filename, callback){
  request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
};
