var express = require('express');

var app = express(); // get an instance of express

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views');

// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));

// app.set('view engine', 'jade');
// app.set('view engine', '.hbs');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {title: "Hello", list: ['a', 'b']});
});

app.get('/books', function(req, res) {
  res.send('Hello!');
});

app.listen(port, function( err ) {
  console.log( 'running server on port ' + port );
});