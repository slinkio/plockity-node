/*
  Plockity
  ---
  index.js
*/

var configuration = require('./package.json');

// Libraries
var logger            = require('./lib/logger'),
    connectionLibrary = require('./lib/connection');

module.exports = Plockity;

function Plockity ( options ) {
  if( !options.appId ) {
    throw new Error('Constructing a new Plockity connection requires an appId specified');
  }

  if( options.appId.length !== 24 ) {
    throw new Error('Please pass a valid appId to Plockity constructor');
  }

  options.server = options.server || {};

  this.configuration = {
    appKey:        options.appKey,
    server: {
      host:        options.server.host || 'plockity.com',
      namespace:   options.namespace   || 'api',
      port:        options.server.port || 80
    },
    autoConnect:   options.autoConnect || true
  };

  this.version = configuration.version;
  this.author  = configuration.author;
  this.__log   = logger;

  this.__log.transports.console.level = ( options.debug ) ? 'debug' : 'warn';

  var srv = this.configuration.server;

  this.__connection = {
    address: 'http://' + srv.host + ':' + srv.port + '/',
    headers: {
      'App-Key':   this.configuration.appKey,
      'X-Adapter': 'plockity-node'
    }
  };

  if( srv.namespace ) {
    this.__connection.address += srv.namespace + '/';
  }

  if( this.configuration.autoConnect ) {
    var self = this;

    this.__connect().then(function ( auth ) {
      self.connected = true;
      self.__authorization = auth;
    }).catch(function ( err ) {
      self.__log.warn( 'Authorization Error:', err, '. Retrying...' );
      setTimeout(self.__connect.bind( self ), 5000);
    });
  }

  return this;
}

Plockity.prototype.__connect         = connectionLibrary.connect;
Plockity.prototype.__checkConnection = connectionLibrary.checkConnection;
