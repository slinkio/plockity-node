/*
  Plockity Library
  ---
  Logger ( Winston )
*/

var winston = require('winston');

module.exports = new ( winston.Logger ) ({
  transports: [
    new ( winston.transports.Console )({ level: 'warn' }),
  ]
});
