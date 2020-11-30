'use strict';
var http = require('http');
var dt = require('./myfirstmodule');
var fs = require('fs');
//var mongo = require('mongodb');

http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<html>\n<body>\n");

    res.write("</body>\n</html>");
    return res.end();
       
}).listen(1337);
