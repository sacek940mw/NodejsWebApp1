var http = require('http');
var url = require('url');
const port = process.env.PORT || 1337
var fs = require('fs');
const mon = require('./mongo');
const { parse } = require('querystring');

var hasla = [];


exports.newSer = function () {
    var serwer = http.createServer(function (req, res) {
        var q = url.parse(req.url, true);
        if (q.pathname == "/" || q.pathname == "/index.html") {
            var prom = mon.znajdzHasla();
            var waited = prom.then((value) => {
                hasla = value;
                if (req.method === 'POST') {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    waited = req.on('end', () => {
                        console.log(parse(body));
                        waited = mon.dodajHaslo(parse(body));
                        res.end(`dodano`);
                    });
                } else {
                    waited = console.log("write");
                    res.write(`
                <!doctype html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Manager hase³</title>
                </head>
                <body>            
                    <h1 align="center">Dodaj has³o</h1>  
                    <div class="formularz" align="center">
                        <form align=\"center\" action="http://localhost:`+ port + `/dodaj_haslo" method="post">
                            <label for="strona">Strona:</label><br>
                            <input type="text" name="strona" /><br>
                            <label for="login">Login:</label><br>
                            <input type="text" name="login" /><br>
                            <label for="haslo">Has³o:</label><br>
                            <input type="text" name="haslo" /><br>
                            <button>Dodaj</button>
                        </form>
                        <br>
                    </div>`);
                    res.write(`
                    <div class="hasla" align="center">
                        <br>
                        <table align=\"center\" border=\"1\">
                          <tr>
                            <th>Strona: </th>
                            <th>Login: </th>
                            <th>Has³o: </th>
                          </tr>
                `);
                    var i;
                    for (i = 0; i < hasla.length; i++) {
                        console.log(hasla[i]);
                        res.write('<tr>');
                        res.write('<th>' + hasla[i].strona + '</th>');
                        res.write('<th>' + hasla[i].login + '</th>');
                        res.write('<th>' + hasla[i].haslo + '</th>');
                        res.write('<tr>');
                    }
                    res.write(`
                            </table>
                        </div>
                `);
                    res.end(`
                </body>
                </html>
                `);
                }
            });
        } else if (q.pathname == "/dodaj_haslo") {

        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found")
        }
    }).listen(port);
};


exports.stwSer = function () {
    var serwer = http.createServer(function (req, res) {
        var q = url.parse(req.url, true);
        console.log(q.pathname);
        var prom = mon.znajdzHasla();
        var waited = prom.then((value) => {
            hasla = value;
            if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                waited = req.on('end', () => {
                    console.log(
                        parse(body)
                    );
                    waited = mon.dodajHaslo(parse(body));
                    //serwer = null;
                    //serwer.close(recreateSerwer);
                });
            } else {
                waited = console.log("write");
                res.write(`
                <!doctype html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Manager hase³</title>
                </head>
                <body>            
                    <h1 align="center">Dodaj has³o</h1>  
                    <div class="formularz" align="center">
                        <form align=\"center\" action="http://localhost:`+port+`" method="post">
                            <label for="strona">Strona:</label><br>
                            <input type="text" name="strona" /><br>
                            <label for="login">Login:</label><br>
                            <input type="text" name="login" /><br>
                            <label for="haslo">Has³o:</label><br>
                            <input type="text" name="haslo" /><br>
                            <button>Dodaj</button>
                        </form>
                        <br>
                    </div>`);
                res.write(`
                    <div class="hasla" align="center">
                        <br>
                        <table align=\"center\" border=\"1\">
                          <tr>
                            <th>Strona: </th>
                            <th>Login: </th>
                            <th>Has³o: </th>
                          </tr>
                `);
                var i;
                for (i = 0; i < hasla.length; i++) {
                    console.log(hasla[i]);
                    res.write('<tr>');
                    res.write('<th>' + hasla[i].strona + '</th>');
                    res.write('<th>' + hasla[i].login + '</th>');
                    res.write('<th>' + hasla[i].haslo + '</th>');
                    res.write('<tr>');
                }
                res.write(`
                            </table>
                        </div>
                `);
                res.end(`
                </body>
                </html>
                `);
            }
        });
    }).listen(port);
    
};

