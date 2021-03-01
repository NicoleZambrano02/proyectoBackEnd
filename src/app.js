// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express() // create your express app
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = 'mongodb+srv://default-user:1404nicoleZ@cluster0.r7lu3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
var client;
var mongoClient = new MongoClient(uri, {
    reconnectTries:
    Number.MAX_VALUE, autoReconnect: true, useNewUrlParser: true
})
mongoClient.connect((err, db) => { // returns db connection
    if (err != null) {
        console.log(err)
        return
    }
    client = db
})

// make app use dependencies
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
//GET
app.get('/todo', (req, res) => {
    const collection = client.db("test").collection("todos")
    collection.find().toArray(function (err, results) {
        if (err) {
            console.log(err)
            res.send([])
            return
        }

        res.send(results)
    })
})
//POST
app.post('/addTodo', (req, res) => {
    const collection = client.db('test').collection('todos')
    var todo = req.body.todo // parse the data from the request's body
    collection.insertOne({title: todo}, function (err, results) {
        if (err) {
            console.log(err)
            res.send('')
            return
        }
        res.send(results.ops[0]) // returns the new document
    })
})
//DELETE
app.post('/deleteTodo', (req, res) => {
    const collection = client.db('test').collection('todos')
    // remove document by its unique _id
    collection.removeOne({'_id': mongo.ObjectID(req.body.todoID)}, function (err, results) {
        if (err) {
            console.log(err)
            res.send('')
            return
        }
        res.send() // return
    })
})
app.listen(process.env.PORT || 8081) // client is already running on 8080




