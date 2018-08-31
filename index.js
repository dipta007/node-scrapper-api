var elasticSearch = require('./elastic-search/refresh-elastic')
var express = require('express')
var app = express()

app.get('/', function(req, resp) {
    resp.send("Hello from dipta007")
})

app.get('/refresh', function(req, resp) {
    elasticSearch.refresh()
})

var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening on ", host, port)
})