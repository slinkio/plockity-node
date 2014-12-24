/*
  Plockity
  ---
  index.js
*/

var configuration = require('./package.json');

// Libraries
var logger            = require('./lib/logger'),
    connectionLibrary = require('./lib/connection'),
    vaultLibrary      = require('./lib/vault');

module.exports = Plockity;

function Plockity ( options ) {
  if( !options.apiKey ) {
    throw new Error('Constructing a new Plockity adapter requires an apiKey specified');
  }

  options.server = options.server || {};

  this.configuration = {
    apiKey:      options.apiKey,
    signature:   options.appSignature,
    server: {
      host:      options.server.host || 'localhost',
      namespace: options.namespace   || 'api',
      port:      options.server.port || 3000
    },
    autoConnect: ( options.autoConnect !== undefined ) ? options.autoConnect : true
  };

  this.version = configuration.version;
  this.author  = configuration.author;
  this.__log   = logger;

  this.__log.transports.console.level = ( options.debug ) ? 'debug' : 'warn';

  var srv = this.configuration.server;

  this.__connection = {
    address: 'http://' + srv.host + ':' + srv.port + '/',
    headers: {
      'X-Adapter': 'plockity-node'
    }
  };

  if( srv.namespace ) {
    this.__connection.address += srv.namespace + '/';
  }

  if( this.configuration.autoConnect ) {
    var self = this;

    self.pendingConnection = this.createConnection().catch(function ( err ) {
      self.__log.warn( 'Authorization Error:', err, '. Retrying...' );
      setTimeout(self.__connect.bind( self ), 5000);
    });
  }

  return this;
}

Plockity.prototype.createConnection  = connectionLibrary.createConnection;
Plockity.prototype.__connect         = connectionLibrary.connect;
Plockity.prototype.__checkConnection = connectionLibrary.checkConnection;
Plockity.prototype.__request         = connectionLibrary.request;

Plockity.prototype.vault = vaultLibrary;
