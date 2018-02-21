var express = require('express');

var app = express(); // get an instance of express

var port = 5000;

app.get('/', function(req, res) {
  res.send('Hello!');
});

app.get('/books', function(req, res) {
  res.send('Hello!');
});

app.listen(port, function( err ) {
  console.log( 'running server on port ' + port );
});