var Cast = function(){
  var mongoose  = require('mongoose'),
      Schema    = mongoose.Schema,
      validate  = require('mongoose-validator').validate;

  var sourceSchema = new Schema({
    src: String,
    quality: String
  });

  var castSchema = new Schema({
    name: {type: String, validate: validate( {message: "Name is a required field."}, 'notEmpty') },
    description: {type: String, validate: validate( {message: "Description is a required field."}, 'notEmpty') },
    url: String,
    readme: String,
    summary: String,
    synopsis: String,
    user: {type : Schema.ObjectId, ref : 'User'},
    tags: Array,
    createdAt: Date,
    updatedAt: Date,
    video: {
      poster: {type:String, validate: validate( {message: "Poster is a required field."}, 'notEmpty') },
      autoResize: {type: String, default:'none'},
      embedSize: {type: Number, default:848.0},
      uid: {type:String, validate: validate( {message: "UID is a required field."}, 'notEmpty')},
      name: String,
      preload: {type:String, default:'none'},
      source: {type: Array, schema: sourceSchema, validate: [function(e){
        // console.log(e);
        // console.log(e.length);
        if ( e === undefined ) {
          return false;
        } else {
          if ( e.length == 0 ) {
            return false;
          }
        }
      }, 'Please add at least one source.']}
    }
  });

  var _model = mongoose.model('Cast',castSchema)

  var _callbackHandler = function(callback, err, docs) {
    if(err) {
      console.log(err);
    }
    else {
      callback(docs);
    }
  }

  var _new = function(doc) {
    return new _model(doc);
  };

  var _create = function(doc,cb) {
    var newCast = new _model(doc);
    newCast.save(_callbackHandler.bind(null,cb));
  };

  var _findByName = function(name,success) {
    _model.findOne({name:name},_callbackHandler.bind(null,success));
  };

  var _findByUser = function(user,success) {
    _model.find({user:user},_callbackHandler.bind(null,success));
  };

  var _findById = function(id,success) {
    _model.findById(id,_callbackHandler.bind(null,success));
  };
  // Public Interface
  return {
    schema  : castSchema,
    model   : _model,
    create  : _create,
    new     : _new,
    findByName : _findByName,
    findById : _findById,
    findByUser : _findByUser
  }

}();

module.exports = Cast;