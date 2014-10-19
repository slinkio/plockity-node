/*
  Plockity Library
  ---
  Vault
*/

var request  = require('request'),
    chalk    = require('chalk'),
    jwt      = require('jwt-simple'),
    queryStr = require('querystring'),
    Promise  = require('bluebird'); // jshint ignore:line

/**
 * Inserts documents to vault
 * @param  {String} key     Unique document key
 * @param  {Object} data    Document data
 * @param  {Object} options Document options
 * @return {Promise}
 */
exports.insert = function ( key, data, options ) {
  var self = this;

  return new Promise(function ( resolve, reject ) {
    self.__checkConnection().then(function () {
      var reqObject = {
        dataKey: key,
        payload: jwt.encode( data, self.configuration.appSignature ),
        options: options
      };

      var address = {
        url: self.__connection.address + 'vault/',
        json: true,
        multipart: [
          {
            'content-type': 'application/json',
            body: JSON.stringify( reqObject )
          }
        ]
      };

      self.__request().post(address, function ( err, res, body ) {
        if( err ) {
          return reject( err );
        }

        resolve( body );
      });
    }).catch( reject );
  });

};

/**
 * Updates documents in vault
 * @param  {String} key     Document key
 * @param  {Object} data    Update data
 * @param  {Object} options
 * @return {Promise}
 */
exports.update = function ( key, data, options ) {
  var self = this;

  return new Promise(function ( resolve, reject ) {
    self.__checkConnection().then(function () {
      var reqObject = {
        dataKey: key,
        payload: jwt.encode( comparisons, self.configuration.appSignature ),
        options: options
      };

      var address = {
        url: self.__connection.address + 'vault/',
        json: true,
        multipart: [
          {
            'content-type': 'application/json',
            body: JSON.stringify( reqObject )
          }
        ]
      };

      self.__request().put(address, function ( err, res, body ) {
        if( err ) {
          return reject( err );
        }

        resolve( body );
      });
    }).catch( reject );
  });

};

/**
 * Deletes vault documents
 * @param  {String} key     Document key
 * @param  {String} options
 * @return {Promise}
 */
exports.delete = function ( key, options ) {
  var self = this;

  return new Promise(function ( resolve, reject ) {
    self.__checkConnection().then(function () {
      var reqObject = {
        dataKey: key,
        options: options
      };

      var address = {
        url: self.__connection.address + 'vault/',
        json: true,
        multipart: [
          {
            'content-type': 'application/json',
            body: JSON.stringify( reqObject )
          }
        ]
      };

      self.__request().del(address, function ( err, res, body ) {
        if( err ) {
          return reject( err );
        }

        resolve( body );
      });
    }).catch( reject );
  });

};

/**
 * Access the compare api
 * @param  {String} key         Vault document key
 * @param  {Objcet} comparisons Comparisons to make
 * @param  {Object} options
 * @return {Promise}
 */
exports.compare = function ( key, comparisons, options ) {
  var self = this;

  return new Promise(function ( resolve, reject ) {
    self.__checkConnection().then(function () {
      var reqObject = {
        dataKey: key,
        payload: jwt.encode( comparisons, self.configuration.appSignature ),
        options: options
      };

      var address = {
        url: self.__connection.address + 'compare/?' + queryStr.stringify( reqObject ),
        json: true
      };

      self.__request().get(address, function ( err, res, body ) {
        if( err ) {
          return reject( err );
        }

        resolve( body );
      });
    }).catch( reject );
  });

};

exports.getRaw = function ( key ) {
  var self = this;

  return new Promise(function ( resolve, reject ) {
    self.__checkConnection().then(function () {
      var address = {
        url: self.__connection.address + 'raw/?key=' + key,
        json: true
      };

      self.__request().get(address, function ( err, res, body ) {
        if( err ) {
          return reject( err );
        }

        resolve( body );
      });
    }).catch( reject );
  });

};
