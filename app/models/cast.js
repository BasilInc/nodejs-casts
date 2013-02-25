var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , validate = require('mongoose-validator').validate;

var Source = new Schema({
  src: String,
  quality: String
});

var Cast = new Schema({
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
    source: {type: Array, schema: Source, validate: [function(e){
      console.log(e);
      console.log(e.length);
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

mongoose.model('Cast', Cast);