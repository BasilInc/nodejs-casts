var should    = require("should"),
    mongoose  = require("mongoose"),
    config    = require("../../config/config").test
    Cast      = require("../../app/models/cast");

mongoose.connect(config.db);

describe('Cast', function(){
  beforeEach(function(done){
    var newCast = Cast.create({
      name: 'TestCast1', 
      description: 'Test Description', 
      video: {
        poster: '123', 
        uuid:'123', 
        source: [
        {src:'123'}
        ]
      }}, function(cast){
        done();
    });
    
  });

  afterEach(function(done){
    Cast.model.remove({}, function() {
      done();
    });
  });


  it("saves a new cast", function(done){
    var newCast = Cast.new({
      name: 'TestCast2', 
      description: 'Test Description', 
      video: {
        poster: '123', 
        uuid:'123', 
        source: [
        {src:'123'}
        ]
      }});

    newCast.name.should.equal('TestCast2');
    done();

  });

  it("creates and saves a new cast", function(done){
    var newCast = Cast.create({
      name: 'TestCast2', 
      description: 'Test Description', 
      video: {
        poster: '123', 
        uuid:'123', 
        source: [
        {src:'123'}
        ]
      }}, function(cast){
      cast.name.should.equal('TestCast2');
      done();
    });
  });

  it("finds a cast by name", function(done) {
    Cast.findByName('TestCast1', function(cast){
      cast.name.should.equal('TestCast1');
      done();
    })
  })
});