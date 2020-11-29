'use strict';
var http = require('http');
var dt = require('./myfirstmodule');
var fs = require('fs');
//var mongo = require('mongodb');

http.createServer(function (req, res) {
    
    fs.readFile('./demofile1.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);

    });
    res.write("The date and time are currently: " + dt.myDateTime());
    res.write("</body>\n</html>");
    res.end();
}).listen(1337);

//Modu³y:


/*

var insertDocument = function (db, callback) {
    db.collection('families').insertOne({
        "id": "AndersenFamily",
        "lastName": "Andersen",
        "parents": [
            { "firstName": "Thomas" },
            { "firstName": "Mary Kay" }
        ],
        "children": [
            { "firstName": "John", "gender": "male", "grade": 7 }
        ],
        "pets": [
            { "givenName": "Fluffy" }
        ],
        "address": { "country": "USA", "state": "WA", "city": "Seattle" }
    }, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the families collection.");
        callback();
    });
};

var findFamilies = function (db, callback) {
    var cursor = db.collection('families').find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

var updateFamilies = function (db, callback) {
    db.collection('families').updateOne(
        { "lastName": "Andersen" },
        {
            $set: {
                "pets": [
                    { "givenName": "Fluffy" },
                    { "givenName": "Rocky" }
                ]
            },
            $currentDate: { "lastModified": true }
        }, function (err, results) {
            console.log(results);
            callback();
        });
};

var removeFamilies = function (db, callback) {
    db.collection('families').deleteMany(
        { "lastName": "Andersen" },
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    var db = client.db('familiesdb');
    insertDocument(db, function () {
        findFamilies(db, function () {
            updateFamilies(db, function () {
                removeFamilies(db, function () {
                    client.close();
                });
            });
        });
    });
});
*/