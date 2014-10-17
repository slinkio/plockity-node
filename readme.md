# Plockity - Node.js Package

## Install

`npm install plockity-node`

## Create and Configure

```javascript
var PlockityAdapter = require('plockity-node');

var locker = new PlockityAdapter({
  appKey: 'myAppKeyHere'
});
```

## Examples

```javascript
var PlockityAdapter = require('plockity-node');

var locker = new PlockityAdapter({
  appKey: 'myAppKeyHere'
});

var originalSSN = '123456789';

locker.vault('mydatakey', {
  ssn: originalSSN,
  name: {
    first: 'willy',
    last:  'wonka'
  }
}, {
  disableEncryption: [
    'name'
  ]
}).then(function ( result ) {
  console.log( result.name.first ); // "willy"
  console.log( result.ssn );        // undefined

  return locker.vault('mydatakey', { ssn: '123456788' }).then(function ( result ) {

    return locker.compare('mydatakey', { ssn: originalSSN, name: { first: "willy" } }).then(function ( result ) {
      console.log( result.ssn );        // false
      console.log( result.name.first ); // true
    });

  });

}).catch(function ( err ) {
  throw err;
});
```
