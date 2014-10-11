/*
  Plockity Library
  ---
  Connection
*/

var request = require('request'),
    chalk   = require('chalk'),
    Promise = require('bluebird'); // jshint ignore:line

exports.connect = function () {
  var self = this;

  return new Promise(function ( resolve, reject ) {
    self.__log.debug( chalk.green('Plockity Connect :: Connecting...') );

    var address = {
      url:     self.__connection.address + 'authorize/',
      headers: self.__connection.headers
    };

    request(address, function ( err, res, body ) {
      if( err ) {
        self.__log.debug( chalk.green('Plockity Connect :: Connection error') );
        throw new Error( err );
      }

      if( res && res.statusCode === 200 ) {
        self.__log.debug( chalk.green('Plockity Connect :: Received authorization') );
        self.__authorization = body;
      } else {
        self.__log.debug( chalk.green('Plockity Connect :: Something wrong with request, server responded with code', res.statusCode) );
        throw new Error( err );
      }
    });
  });
};
