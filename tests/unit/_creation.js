var cwd = process.cwd();

var chai        = require('chai'),
    chaiPromise = require('chai-as-promised'),
    expect      = chai.expect,
    _           = require('lodash'),
    async       = require('async'),
    chalk       = require('chalk');

chai.use( chaiPromise );

var PlockityAdapter = require(process.cwd() + '/index');

describe('Plockity :: Constructor', function () {
  it('should be a function', function () {
    expect(PlockityAdapter).to.be.a('function');
  });

  it('should instantiate a plockityAdapter', function () {
    var adapter = new PlockityAdapter({
      apiKey:      '123',
      autoConnect: false
    });

    expect(adapter).to.be.an.instanceof(PlockityAdapter);
  });
});
