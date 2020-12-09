var http = require('http');
var url = require('url');
const port = process.env.PORT || 1337
var fs = require('fs');
const mon = require('./mongo');
const { parse } = require('querystring');
var host = "https://mongoapka.azurewebsites.net";
//var host = "http://localhost:1337";

var hasla = [];
//var edytowany = { strona: "", login: "", haslo: "" };
var edytowany;
var logged = true;


exports.newSer = function () {
    var serwer = http.createServer(function (req, res) {
        if (logged == true) {
            var q = url.parse(req.url, true);
            var pathname = q.pathname.split('_');
            if (q.pathname == "/" || q.pathname == "/index.html") {
                var prom = mon.znajdzHasla();
                var waited = prom.then((value) => {
                    hasla = value;

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
                        <form align=\"center\" action="`+ host + `/dodaj_haslo" method="post">
                            <label for="strona">Strona:</label><br>
                            <input type="text" name="strona"><br>
                            <label for="login">Login:</label><br>
                            <input type="text" name="login"><br>
                            <label for="haslo">Has³o:</label><br>
                            <input type="text" name="haslo"><br>
                            <button>Dodaj</button>
                        </form>
                        <br>
                    </div>`);
                    res.write(`
                    <div class="hasla" align="center">
                        <h1 align="center">Lista hase³:</h1> 
                        <br>
                        <table align=\"center\" border=\"1\">
                          <tr>
                            <th>Strona: </th>
                            <th>Login: </th>
                            <th>Has³o: </th>
                            <th> </th>
                          </tr>
                `);
                    var i;
                    for (i = 0; i < hasla.length; i++) {
                        //console.log(hasla[i]);
                        res.write('<tr>');
                        res.write('<th>' + hasla[i].strona + '</th>');
                        res.write('<th>' + hasla[i].login + '</th>');
                        res.write('<th>' + hasla[i].haslo + '</th>');
                        res.write('<th><a href="' + host + '/edycja_' + hasla[i]._id + '">Edytuj</a></th>');
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
                });
            } else if (q.pathname == "/dodaj_haslo") {
                if (req.method === 'POST') {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    waited = req.on('end', () => {
                        console.log(parse(body));
                        var wyn = mon.dodajHaslo(parse(body));
                        waited = wyn.then((value) => {
                            res.write(`
                <!doctype html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Manager hase³</title>
                </head>
                <body>            
                    <h1 align="center">`+ value + `</h1> 
                    <div class="guzik" align="center">
                        <button onclick="window.location.href='`+ host + `'">Powrót do strony g³ównej</button>
                        <br>
                    </div>                       
                </body>
                </html>
                `);
                            res.end();
                        });
                    });
                }
            } else if (q.pathname.includes('edytujHaslo')) {
                if (req.method === 'POST') {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    waited = req.on('end', () => {
                        console.log("edutuj0: " + pathname[0]);
                        console.log("edutuj1: " + pathname[1]);
                        //console.log("edutuj2: " + body);
                        var wyn = mon.edytujHaslo(edytowany, parse(body));
                        //var wyn = mon.dodajHaslo(parse(body));
                        waited = wyn.then((value) => {
                            res.write(`
                <!doctype html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Manager hase³</title>
                </head>
                <body>            
                    <h1 align="center">`+ value + `</h1> 
                    <div class="guzik" align="center">
                        <button onclick="window.location.href='`+ host + `'">Powrót do strony g³ównej</button>
                        <br>
                    </div>                       
                </body>
                </html>
                `);
                            res.end();
                        });
                    });
                }
            } else if (q.pathname.includes('usunHaslo')) {
                waited = console.log("write");

                    var wyn = mon.usunHaslo(pathname[1]);
                    waited = wyn.then((value) => {
                        res.write(`
                <!doctype html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Manager hase³</title>
                </head>
                <body>            
                    <h1 align="center">`+ value + `</h1> 
                    <div class="guzik" align="center">
                        <button onclick="window.location.href='`+ host + `'">Powrót do strony g³ównej</button>
                        <br>
                    </div>                       
                </body>
                </html>
                `);
                        res.end();
                    });
                //});
            }else if (q.pathname.includes('edycja')) {
                var prom = mon.znajdzHasloPoID(pathname[1]);
                var waited = prom.then((value) => {
                    edytowany = value[0];
                    //console.log("Edytowany: " + value[0]);
                    res.write(`
                <!doctype html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Manager hase³</title>
                </head>
                <body>            
                    <h1 align="center">Edytuj has³o:</h1> 
                    <div class="eForm" align="center">
                        <form align=\"center\" action="`+ host + `/edytujHaslo_` + pathname[1] + `" method="post">
                            <label for="strona">Strona:</label><br>
                            <input type="text" name="strona" value="` + value[0].strona + `"><br>
                            <label for="login">Login:</label><br>
                            <input type="text" name="login" value="` + value[0].login + `"><br>
                            <label for="haslo">Has³o:</label><br>
                            <input type="text" name="haslo" value="` + value[0].haslo + `"><br>
                            <button>Edytuj</button><br>
                        </form>
                    </div>
                    <div class="guzik" align="center">
                        <h1 align="center" >------------------</h1> 
                        <button onclick="window.location.href='`+ host + `/usunHaslo_` + pathname[1] + `'">Usuñ dane</button>
                        <br>
                    </div> 
                </body>
                </html>
                `);
                    res.end();
                });

            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found")
            }
        } else {

        }
        
    }).listen(port);
};