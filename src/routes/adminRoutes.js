var express     = require( 'express' );
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
  {
    bookId: 656,
    title : 'War and Peace',
    genre : 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read  : false
  },
  {
    bookId: 24280,
    title : 'Les Misérables',
    genre : 'Historical Fiction',
    author: 'Victor Hugo',
    read  : false
  },
  {
    title : 'The Time Machine',
    genre : 'Science Fiction',
    author: 'H. G. Wells',
    read  : false
  },
  {
    title : 'A Journey into the Center of the Earth',
    genre : 'Science Fiction',
    author: 'Jules Verne',
    read  : false
  },
  {
    title : 'The Dark World',
    genre : 'Fantasy',
    author: 'Henry Kuttner',
    read  : false
  },
  {
    title : 'The Wind in the Willows',
    genre : 'Fantasy',
    author: 'Kenneth Grahame',
    read  : false
  },
  {
    title : 'Life On The Mississippi',
    genre : 'History',
    author: 'Mark Twain',
    read  : false
  },
  {
    title : 'Childhood',
    genre : 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read  : false
  }
];

var router = function( nav ) {

  adminRouter.route( '/addBooks' )
    .get( function( req, res ) {
      var url = 'mongodb://localhost:27017/libraryApp';

      mongodb.connect( url, function( err, db ) {
        if(err) {
          console.log( 'connect err', err );
        }
        else{
          var collection = db.collection( 'books' );
          collection.insertMany( books,
            function( err, results ) {
              if(err){
                console.log( 'inserMany err', err );
              }
              else{
                res.send( results );
                db.close();
              }
            }
          );
        }

      } );
    } );

  return adminRouter;
};

module.exports = router;