'use strict';
var http = require('http');
var url = require('url');
const port = process.env.PORT || 1337
//var dt = require('./myfirstmodule');
var fs = require('fs');
const mon = require('./mongo');
const stron = require('./strona');
const { parse } = require('querystring');

var hasla = [];

//var serwer = stron.stwSer();
var serwer = stron.newSer();

