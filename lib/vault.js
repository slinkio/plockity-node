/*
  Plockity Library
  ---
  Vault
*/

var request = require('request'),
    chalk   = require('chalk'),
    jwt     = require('jwt-simple'),
    Promise = require('bluebird'); // jshint ignore:line

exports.vault = function ( key, data, options ) {
  var self = this;

  return new Promise(function ( resolve, reject ) {
    self.__checkConnection().then(function () {

    }).catch( reject );
  });

};

exports.compare = function ( key, comparisons, options ) {
  var self = this;

  return new Promise(function ( resolve, reject ) {
    self.__checkConnection().then(function () {
      var reqObject = {
        dataKey: key,
        compare: comparisons
      };

      var signedRequest = jwt.encode( reqObject, self.__authorization.session );

      var address = {
        url: self.__connection.address + 'compare/?signed_request=' + signedRequest,
        json: true
      };

      self.__request().get(address, function ( err, res, body ) {
        
      });
    }).catch( reject );
  });

};
