var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://cosmosace:u1Jdn9vibrTgQo3hvbTTCnKoIr9BB3qLpT91Z8Vt9WpC1lQigxyNfkntjtyA71MaMXcNuToDZwsHqw4YyCFQ2w%3D%3D@cosmosace.mongo.cosmos.azure.com:10255/?ssl=true&appName=@cosmosace@";
//var Promise = require('rsvp').Promise;

exports.dodajHaslo = function (myobj) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("strona");
            //var myobj = { name: "Company Inc", address: "Highway 37" };
            dbo.collection("Hasla").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                resolve("Has³o dodane");
            });
        });
    });
};

exports.znajdzHasla = function () {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('strona');
            dbo.collection("Hasla").find({}).toArray(function (err, result) {
                if (err) throw err;
                //console.log(result[1]);
                db.close();
                resolve(result);
            });
        });
    });
};