var fs = require('fs');

var www = function (path) {
    var view = function(req, res) {
        var filename = "";
        
        if('file' in req.params) {
            filename = req.params.file;
        }
        
        fs.readFile(__path + '/www/' + path + filename, function(error, file) {
            if(error) {
                res.writeHead(404);
                return res.end('Not Founded!');
            }
            
            res.writeHead(200);
            return res.end(file);
        });
    }
    
    return view;
}

module.exports = www;