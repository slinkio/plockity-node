# Plockity - Node.js Package

## Install

`npm install plockity-node`

## Create and Configure

```javascript
var PlockityAdapter = require('plockity-node');

var locker = new PlockityAdapter({
  appKey:       'myAppKeyHere',
  appSignature: 'myAppSignatureHere'
});
```

## Examples

```javascript
var PlockityAdapter = require('plockity-node');

var locker = new PlockityAdapter({
  appKey: 'myAppKeyHere'
});

var originalSSN = '123456789';

locker.vault.insert('mydatakey', {
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

  return locker.vault.update('mydatakey', { ssn: '123456788' }).then(function ( result ) {

    return locker.vault.compare('mydatakey', { ssn: originalSSN, name: { first: "willy" } }).then(function ( result ) {
      console.log( result.ssn );        // false
      console.log( result.name.first ); // true
    });

  });

}).catch(function ( err ) {
  throw err;
});
```
