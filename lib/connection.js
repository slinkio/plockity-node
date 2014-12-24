/*
  Plockity Library
  ---
  Connection
*/

var request = require('request'),
    chalk   = require('chalk'),
    Promise = require('bluebird'); // jshint ignore:line

/**
 * Create a Connection
 * 
 * Public
 * 
 * @return {Promise} Returns a promise
 */
exports.createConnection = function () {
  var self = this;

  return this.__connect().then(function ( auth ) {
    console.log('DEBUG: Did connect -> exports.createConnection#this._connect().then');
    self.connected                                   = true;
    self.__authorization                             = auth;
    self.__connection.headers['X-App-Authorization'] = self.__authorization.token;
    console.log(self);
  });
};

/**
 * Connect
 * @return {Promise} Returns a promise
 */
exports.connect = function () {
  var self = this;

  return new Promise(function ( resolve, reject ) {
    self.__log.debug( chalk.green('Plockity Connect :: Connecting...') );

    var address = {
      url:  self.__connection.address + 'authorize?apiKey=' + encodeURIComponent(self.configuration.apiKey),
      json: true
    };
    console.log('headers', self.__connection.headers);
    console.log('address', address);
    self.__request()(address, function ( err, res, body ) {
      if( err ) {
        self.__log.debug( chalk.green('Plockity Connect :: Connection error') );
        throw new Error( err );
      }

      if( res && res.statusCode === 200 ) {
        self.__log.debug( chalk.green('Plockity Connect :: Received authorization') );
        resolve( body );
      } else {
        console.log(err, res);
        self.__log.debug( chalk.green('Plockity Connect :: Something wrong with request, server responded with code', res.statusCode) );
        throw new Error( ( err ) ? err : ( res.body && res.body.error ) ? res.body.error : res.body );
      }
    });
  });
};

/**
 * Check connection for deferred action handling
 *
 * Private
 * 
 * @return {Promise} Returns a promise
 */
exports.checkConnection = function () {
  var self = this;

  return new Promise(function ( resolve, reject ) {
    if( !self.connected && !self.pendingConnection ) {
      return reject( new Error('Adapter is not authorized or connected. Please establish a connection with autoConnect: true or Plockity.createConnection()') );
    }

    if( self.pendingConnection && self.pendingConnection.isPending() ) {
      return self.pendingConnection;
    }

    if( !self.__authorization ) {
      return reject( new Error('No authorization') );
    }

    resolve();
  });
};

/**
 * Request Wrapper
 * @return {Object} Returns a request wrapper with headers in defaults
 */
exports.request = function () {
  return request.defaults({
    headers: this.__connection.headers
  });
};
