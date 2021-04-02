const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'blog-posts';
const client = new MongoClient(url);


let DataClient = {
    db: null,
    connectToServer: function() {
        let me = this;
        return new Promise((success, error) => {
            if (me.db !== null) {
                console.log('Connection already created');
                success();
            } else {
                // Use connect method to connect to the server
                client.connect(function(err) {
                    assert.equal(null, err);
                    console.log('Connected successfully to server');

                    me.db = client.db(dbName);
                    success();
                });   
            }  
        });
    },
    findDocuments: function() {
        return new Promise((success, error) => {
            // Get the documents collection
            const collection = this.db.collection('posts');
            // Find some documents
            collection.find({}).toArray(function(err, docs) {
                assert.equal(err, null);
                success(docs);
            });
        });
    },
    insertDocuments: function(db, callback) {
        // Get the documents collection
        const collection = db.collection('posts');
    
        let postA = {
            title: 'Hello World',
            content: 'Some content',
            author: 'Alex K'
        }
    
        let postB = {
            title: 'Ok ok ok',
            content: 'Ooooh no'
        }
    
        let postC = {
            author: 'Dmitry K'
        };
    
        // Insert some documents
        collection.insertMany([postA, postB, postC], function(err, result) {
          callback(result);
        });
    }
};

module.exports = DataClient;