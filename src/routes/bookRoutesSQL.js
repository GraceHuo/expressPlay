var express    = require( 'express' );
var bookRouter = express.Router();

var router = function( nav, connection ) {
  bookRouter.route( '/' )
    .get( function( req, res ) {
      connection.query( 'SELECT * FROM books', function( err, rows, fields ) {
        if ( !err ) {
          var books = JSON.parse( JSON.stringify( rows ) );
          res.render( "bookListView", {
            title: "Books",
            nav  : nav,
            books: books
          } );
        }
        else {
          console.log( 'Error while performing Query.', err );
        }
      } );
    } );

  bookRouter.route( '/:id' )
    .all( function( req, res, next ) {
      var id  = req.params.id;
      var sql = 'SELECT * FROM books WHERE id = ?';
      connection.query( sql, [id], function( err, result ) {
        if ( !err ) {
          if (result.length === 0) {
            res.status(404).send('Not Found');
          }
          else {
            req.book = JSON.parse( JSON.stringify( result ) )[0];
            next();
          }
        }
        else {
          console.log( 'Error while performing Query.', err );
        }
      } )
    } )
    .get( function( req, res ) {
      res.render( "bookView", {
        title: "Book",
        nav  : nav,
        book : req.book
      } );
    } );

return bookRouter;
};


module.exports = router;