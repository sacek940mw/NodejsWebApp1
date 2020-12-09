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
                //console.log("1 document inserted");
                db.close();
                resolve("Password added");
            });
        });
    });
};

exports.edytujHaslo = function (edyt, myobj) {
    console.log("edyt.strona: "+edyt.strona);
    //console.log("myobj: "+myobj);
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("strona");
            //var query = { '_id': ID };

            var query = { strona: edyt.strona, login: edyt.login, haslo: edyt.haslo };
            var newvalues = { $set: myobj };
            dbo.collection("Hasla").updateOne(query, newvalues, function (err, res) {
                if (err) throw err;
                //console.log(res);
                db.close();
                resolve("Password updated");
            });
        });
    });
};

exports.znajdzHasla = function () {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('strona');
            dbo.collection("Hasla").find({}, { projection: { _id: 1, strona: 1, login: 1, haslo: 1 } }).toArray(function (err, result) {
                if (err) throw err;
                //console.log(result[0]._id);
                db.close();
                resolve(result);
            });
        });
    });
};

exports.znajdzHasloPoID = function (ID) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("strona");
            var query = { _id: ID };
            dbo.collection("Hasla").find(query).toArray(function (err, result) {
                if (err) throw err;
                //console.log(result);
                db.close();
                resolve(result);
            });
        });
    });
};

exports.usunHaslo = function (ID) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("strona");
            var query = { _id: ID };
            dbo.collection("Hasla").deleteOne(query, function (err, obj) {
                if (err) throw err;
                db.close();
                resolve("Data deleted"); 
            });
        });
    });
};