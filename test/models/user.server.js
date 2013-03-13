var chai      = require("chai"),
    mongoose  = require("mongoose"),
    config    = require("../../config/config").test,
    User      = require("../../app/models/user")

chai.should();

// mongoose.connect(config.db);

describe('User', function(){
  // Before All Tests
  before(function(done){
    mongoose.connect(config.db);
    done();
  });

  // After all Tests
  after(function(done){
    mongoose.connection.close();
    done();
  });

  // After Each Test
  afterEach(function(done){
    User.model.remove({}, function() {
      done();
    });
  });

  it("creates a new user", function(done){
    var user = User.new({name:'jason',password:'12345678'});
    user.name.should.equal('jason');
    done();
  });

  it("creates and saves a new user", function(done) {
    User.create({name:'jason',password:'12345678'}, function(err,user) {
      user.name.should.equal('jason');
      done();
    })
  });

  it("validates the presence of name, email, and password", function(done) {
    User.create({name:'',email:'', password:''}, function(err,user) {
      err.errors.should.have.property('name');
      err.errors.should.have.property('email');
      err.errors.should.have.property('hashed_password');
      // user.name.should.equal('jason');
      done();
    })
  });

  it("finds a user by email", function(done){
    User.create({name:'jason',password:'12345678', email: 'abc@abc.com'}, function(err,user) {
      User.findByEmail('abc@abc.com',function(err, user) {
        user.name.should.equal('jason');
        done();
      });
    });
  });

  it("finds a user by id", function(done){
    User.create({name:'jason',password:'12345678', email: 'abc@abc.com'}, function(err,user) {
      User.findById(user.id,function(err, user) {
        user.name.should.equal('jason');
        done();
      });
    });
  });
});