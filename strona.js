var http = require('http');
var url = require('url');
const port = process.env.PORT || 1337
var fs = require('fs');
const mon = require('./mongo');
const { parse } = require('querystring');
//var host = "https://mongoapka.azurewebsites.net";
var host = "http://localhost:1337";

var hasla = [];
//var edytowany = { strona: "", login: "", haslo: "" };
var edytowany;
var logged = "TRUE";


exports.newSer = function () {
    var serwer = http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        if (logged == "TRUE") {
            var q = url.parse(req.url, true);
            var pathname = q.pathname.split('_');
            if (q.pathname == "/" || q.pathname == "/index.html") {
                var prom = mon.znajdzHasla();
                var waited = prom.then((value) => {
                    hasla = value;

                    waited = console.log("write");
                    res.write(`
                <!doctype html>
                <html lang="pl-PL">
                <head>
                    <meta charset="utf-8">
                    <title>PASSWORD MANAGER</title>
                </head>
                <body>            
                    <h1 align="center">Add password</h1>  
                    <div class="formularz" align="center">
                        <form align=\"center\" action="`+ host + `/addPassword" method="post">
                            <label for="strona">Page:</label><br>
                            <input type="text" name="strona"><br>
                            <label for="login">Login:</label><br>
                            <input type="text" name="login"><br>
                            <label for="haslo">Password:</label><br>
                            <input type="text" name="haslo"><br>
                            <button>Add password</button>
                        </form>
                        <br>
                    </div>`);
                    res.write(`
                    <div class="hasla" align="center">
                        <h1 align="center">Password list:</h1> 
                        <br>
                        <table align=\"center\" border=\"1\">
                          <tr>
                            <th>Page: </th>
                            <th>Login: </th>
                            <th>Password: </th>
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
                        res.write('<th><a href="' + host + '/edition_' + hasla[i]._id + '">Edit</a></th>');
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
            } else if (q.pathname == "/addPassword") {
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
                    <title>PASSWORD MANAGER</title>
                </head>
                <body>            
                    <h1 align="center">`+ value + `</h1> 
                    <div class="guzik" align="center">
                        <button onclick="window.location.href='`+ host + `'">Back to the main page</button>
                        <br>
                    </div>                       
                </body>
                </html>
                `);
                            res.end();
                        });
                    });
                }
            } else if (q.pathname.includes('editPassword')) {
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
                    <title>PASSWORD MANAGER</title>
                </head>
                <body>            
                    <h1 align="center">`+ value + `</h1> 
                    <div class="guzik" align="center">
                        <button onclick="window.location.href='`+ host + `'">Back to the main page</button>
                        <br>
                    </div>                       
                </body>
                </html>
                `);
                            res.end();
                        });
                    });
                }
            } else if (q.pathname.includes('deletePassword')) {
                waited = console.log("write");

                    var wyn = mon.usunHaslo(pathname[1]);
                    waited = wyn.then((value) => {
                        res.write(`
                <!doctype html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>PASSWORD MANAGER</title>
                </head>
                <body>            
                    <h1 align="center">`+ value + `</h1> 
                    <div class="guzik" align="center">
                        <button onclick="window.location.href='`+ host + `'">Back to the main page</button>
                        <br>
                    </div>                       
                </body>
                </html>
                `);
                        res.end();
                    });
                //});
            }else if (q.pathname.includes('edition')) {
                var prom = mon.znajdzHasloPoID(pathname[1]);
                var waited = prom.then((value) => {
                    edytowany = value[0];
                    //console.log("Edytowany: " + value[0]);
                    res.write(`
                <!doctype html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>PASSWORD MANAGER</title>
                </head>
                <body>            
                    <h1 align="center">Edit password:</h1> 
                    <div class="eForm" align="center">
                        <form align=\"center\" action="`+ host + `/editPassword_` + pathname[1] + `" method="post">
                            <label for="strona">Page:</label><br>
                            <input type="text" name="strona" value="` + value[0].strona + `"><br>
                            <label for="login">Login:</label><br>
                            <input type="text" name="login" value="` + value[0].login + `"><br>
                            <label for="haslo">Password:</label><br>
                            <input type="text" name="haslo" value="` + value[0].haslo + `"><br>
                            <button>Edit</button><br>
                        </form>
                    </div>
                    <div class="guzik" align="center">
                        <h1 align="center" >------------------</h1> 
                        <button onclick="window.location.href='`+ host + `/deletePassword_` + pathname[1] + `'">Delete data</button>
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
            if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                waited = req.on('end', () => {
                    var wyn = mon.zaaloguj();
                    waited = wyn.then((value) => {
                        logged = value[0];
                        res.end("zal")
                    });
                });
            }
            res.end(`
                <!doctype html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>PASSWORD MANAGER</title>
                </head>
                <body>            
                    <h1 align="center">Enter password to login:</h1> 
                    <div class="eForm" align="center">
                        <form align=\"center\" action="`+ host + `/login" method="post">
                            <label for="strona">Password:</label><br>
                            <input type="text" name="strona"><br>
                            <button>Enter</button><br>
                        </form>
                    </div>
                </body>
                </html>
                `);
        }
        
    }).listen(port);
};