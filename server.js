'use strict';
var http = require('http');
var dt = require('./myfirstmodule');
var fs = require('fs');
var mongo = require('mongodb');

http.createServer(function (req, res) {
    
    fs.readFile('./demofile1.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(1337);
