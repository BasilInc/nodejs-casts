var should    = require("should"),
    mongoose  = require("mongoose"),
    config    = require("../../config/config").test,
    Cast      = require("../../app/models/cast"),
    User1      = require("../../app/models/user"),
    User = mongoose.model('User');

mongoose.connect(config.db);

describe('Cast', function(){
  var castId = '';
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
        castId = cast.id;
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

  it("finds a cast by id", function(done) {
    Cast.findById(castId, function(cast){
      cast.name.should.equal('TestCast1');
      cast.id.should.equal(castId);
      done();
    })
  })

  it("finds casts by user", function(done) {
    var user = new User({name:'jason',password:'12345678'})
    user.save(function(err){
      Cast.create({
        name: 'TestCast2', 
        description: 'Test Description', 
        user: user,
        video: {
          poster: '123', 
          uuid:'123', 
          source: [
          {src:'123'}
          ]
      }}, function(){
        Cast.findByUser(user, function(cast){
          cast[0].name.should.equal('TestCast2');
          done();
        })
      });
    })
  });
});