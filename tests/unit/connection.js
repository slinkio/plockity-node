/* jshint expr:true */
var cwd = process.cwd();

var chai        = require('chai'),
    chaiPromise = require('chai-as-promised'),
    expect      = chai.expect,
    _           = require('lodash'),
    async       = require('async'),
    chalk       = require('chalk');

chai.use( chaiPromise );

var PlockityAdapter = require(process.cwd() + '/index');

describe('Plockity :: Lib#Connection', function () {
  var _beachedAdapter = new PlockityAdapter({
    apiKey: '123',
    autoConnect: false
  });

  it('should automatically create a valid authorization & connection by default', function ( done ) {
    var adapter = new PlockityAdapter({
      apiKey: '123'
    });

    expect(adapter.pendingConnection).to.exist.and.to.eventually.be.fulfilled.then(function () {
      expect(adapter.connected).to.equal(true);
      expect(adapter.__authorization).to.exist;

      done();
    });
  });

  it('should not auto connect w/ autoConnect: false', function () {
    expect(_beachedAdapter.pendingConnection).to.be.undefined;
    expect(_beachedAdapter.connected).to.not.be.ok;
  });

  describe('#createConnection', function () {
    it('should exist', function () {
      expect(_beachedAdapter.createConnection).to.be.a('function');
    });

    it('should be a promise', function ( done ) {
      var promise = _beachedAdapter.createConnection();
      expect(promise).to.have.property('then').and.to.eventually.be.fulfilled.and.notify(done);
    });
  });
});
