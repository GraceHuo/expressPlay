var express = require( 'express' );
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express(); // get an instance of express

// var mysql = require('mysql');
// var connection = mysql.createConnection( {
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'Books'
// });
//
// connection.connect(function(err){
//   if(!err) {
//     console.log("Database is connected ...");
//   } else {
//     console.log("Error connecting database ...");
//   }
// });


var port       = process.env.PORT || 5000;

var nav = [
  { Link: '/Books', Text: 'Book' },
  { Link: '/Authors', Text: 'Author' }
];


// var bookRouter = require('./src/routes/bookRoutes')(nav, connection);
// var adminRouter = require('./src/routes/adminRoutes')(nav, connection);
// var authRouter = require('./src/routes/authRoutes')(nav, connection);

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);


app.use( express.static( 'public' ) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

app.set( 'views', './src/views' );

// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));

// app.set('view engine', 'jade');
// app.set('view engine', '.hbs');

app.set( 'view engine', 'ejs' );

app.use( '/Books', bookRouter );
app.use( '/Admin', adminRouter );
app.use( '/Auth', authRouter );

app.get( '/', function( req, res ) {
  res.render( 'index', {
    title: "Hello",
    nav  : nav
  } );
} );

app.get( '/books', function( req, res ) {
  res.send( 'Hello!' );
} );

app.listen( port, function( err ) {
  console.log( 'running server on port ' + port );
} );