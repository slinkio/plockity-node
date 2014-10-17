/*
  Plockity Library
  ---
  Vault
*/

var request = require('request'),
    chalk   = require('chalk'),
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

    }).catch( reject );
  });

};
