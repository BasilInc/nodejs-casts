var User = function(){
  var mongoose  = require('mongoose'),
      Schema    = mongoose.Schema,
      validate  = require('mongoose-validator').validate,
      crypto    = require('crypto');

  var userSchema = new Schema({
    name    : {type: String, validate: validate({message: 'Name cannot be blank'},'notEmpty')},
    email   : {type: String, validate: validate({message: 'Email cannot be blank'},'notEmpty')},
    salt    : String,
    hashed_password : {type: String, validate: validate({message: 'Password cannot be blank'},'notEmpty')},
    username : String,
    provider : String,
    facebook : {},
    twitter : {},
    github : {}
  });

  // Define Methods to be used on the model
  var _authenticate = function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  }

  var _encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  }

  var _makeSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  }


  // Assign Model methods
  userSchema.method('makeSalt', _makeSalt);
  userSchema.method('encryptPassword', _encryptPassword);
  userSchema.method('authenticate', _authenticate);


  // Virtual Attributes
  userSchema
    .virtual('password')
    .set(function(password){
      this._password = password;
      if(password !== '') {
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);  
      }
      else {
        this.hashed_password = ''; 
      }
      
    })
    .get(function(){
      return this._password;
    });

  var _model = mongoose.model('User',userSchema);

  var _callbackHandler = function(callback, err, docs) {
    callback(err,docs);
  };

  var _new = function(doc) {
    return new _model(doc);
  };

  var _create = function(doc, cb) {
    var newUser = new _model(doc);
    newUser.save(_callbackHandler.bind(null,cb));
  };

  var _findByEmail = function(email,success) {
    _model.findOne({email:email},_callbackHandler.bind(null,success));
  };

  var _findById = function(id, success) {
    _model.findById(id,_callbackHandler.bind(null,success));
  }


  // Public Interface
  return {
    model   : _model,
    new     : _new,
    create  : _create,
    findByEmail : _findByEmail,
    findById    : _findById
  };

}();
module.exports = User;

// user schema

// UserSchema.method('authenticate', function(plainText) {
//   return this.encryptPassword(plainText) === this.hashed_password
// })

// var mongoose = require('mongoose')
//   , Schema = mongoose.Schema
//   , crypto = require('crypto')
//   , _ = require('underscore')
//   , authTypes = []

// var UserSchema = new Schema({
//     name: String
//   , email: String
//   , username: String
//   , provider: String
//   , hashed_password: String
//   , salt: String
//   , facebook: {}
//   , twitter: {}
//   , github: {}
// })

// // virtual attributes
// UserSchema
//   .virtual('password')
//   .set(function(password) {
//     this._password = password
//     this.salt = this.makeSalt()
//     this.hashed_password = this.encryptPassword(password)
//   })
//   .get(function() { return this._password })

// // validations
// var validatePresenceOf = function (value) {
//   return value && value.length
// }

// // the below 4 validations only apply if you are signing up traditionally
// UserSchema.path('name').validate(function (name) {
//   // if you are authenticating by any of the oauth strategies, don't validate
//   if (authTypes.indexOf(this.provider) !== -1) return true
//   return name.length
// }, 'Name cannot be blank')

// UserSchema.path('email').validate(function (email) {
//   // if you are authenticating by any of the oauth strategies, don't validate
//   if (authTypes.indexOf(this.provider) !== -1) return true
//   return email.length
// }, 'Email cannot be blank')

// UserSchema.path('username').validate(function (username) {
//   // if you are authenticating by any of the oauth strategies, don't validate
//   if (authTypes.indexOf(this.provider) !== -1) return true
//   return username.length
// }, 'Username cannot be blank')


// // pre save hooks
// UserSchema.pre('save', function(next) {
//   if (!this.isNew) return next()

//   if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
//     next(new Error('Invalid password'))
//   else
//     next()
// })

// // methods
// UserSchema.method('authenticate', function(plainText) {
//   return this.encryptPassword(plainText) === this.hashed_password
// })

// UserSchema.method('makeSalt', function() {
//   return Math.round((new Date().valueOf() * Math.random())) + ''
// })

// UserSchema.method('encryptPassword', function(password) {
//   return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
// })

// mongoose.model('User', UserSchema)
