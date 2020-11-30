'use strict';
var http = require('http');
const port = process.env.PORT || 1337
//var dt = require('./myfirstmodule');
var fs = require('fs');
var mongo = require('mongodb');

http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<html>\n<body>\n");
    res.write("<p>Jakiœ tekst testowy i mongo</p>\n");
    res.write("</body>\n</html>");
    return res.end();
       
}).listen(port);
