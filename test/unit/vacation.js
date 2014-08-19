/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Vacation  = require('../../app/models/vacation'),
    Mongo     = require('mongodb'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'vacation';

describe('Vacation', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Vacation object', function(){
      var o = {name:'Nashville', start:'5/6/2011', end:'5/11/2011', lat:'26', lng:'87', photos:[]},
          v = new Vacation(o);
      expect(v).to.be.instanceof(Vacation);
      expect(v.name).to.equal('Nashville');
      expect(v.start).to.be.instanceof(Date);
      expect(v.end).to.be.instanceof(Date);
      expect(v.lat).to.equal(26);
      expect(v.lng).to.equal(87);
      expect(v.photos).to.have.length(0);

    });
  });

  describe('.all', function(){
    it('should get all vacations', function(done){
      Vacation.all(function(err, vacation){
        expect(vacation).to.have.length(3);
        done();
      });
    });
  });
  describe('.create', function(){
    it('should create a new vacation', function(done){
      var o = {name:'Chicago', start:'8/1/2000', end:'8/13/2000', lat:'40', lng:'77', photos:[]};
      Vacation.create(o, function(err, vacation){
        expect(vacation._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
});
