const express = require("express")
const http = require("http")
const cors = require("cors")
var app = express();
var bodyParser = require("body-parser")

var users = [
    { name: "Sdk", age: 21 },
    { name: "Abbos", age: 22 },
    { name: "Sodiq", age: 23 },
    { name: "Maxxmud", age: 24 },
    { name: "Yoldosh", age: 25 },
]

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/users', (req, res) => {
    res.json({ users })
});

app.post('/users', (req, res) => {
    users.push(req.body)
    res.json()
})

var server = http.createServer(app)

server.listen(8080, () => {
    console.log("Server running on port 8080");
})