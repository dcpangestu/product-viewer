const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:PKwqvIGADs21nc4E@cluster0-aoti1.gcp.mongodb.net/fabelio?retryWrites=true&w=majority';

const cors = require('cors')
app.use(cors())

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    console.log('Database ready');
    var dbo = db.db("fabelio");
    dbo.collection("products").createIndex({ product_name: 'text'});
    db.close();
});

var def = "Sofa 2 dudukan Vienna"

app.get('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        console.log('Connection to database established');
        if (err) throw err;
        var dbo = db.db("fabelio");
        dbo.collection("products")
        .find({ $text: { $search: def }})
        .project({ score: { $meta: "textScore" }})
        .sort({ score: { $meta: "textScore" }})
        .toArray(function(err, result) {
            console.log('sorted!');
            if (err) throw err;
            res.json(result);
            db.close();
            console.log('Connection to database closed');
        });
    });
});

app.get('/all', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        console.log('Connection to database established');
        if (err) throw err;
        var dbo = db.db("fabelio");
        dbo.collection("products")
        .find()
        .toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
            console.log('Connection to database closed');
        });
    });
});

app.listen(process.env.PORT || 9999, () => console.log('Server running on port 9999!'))