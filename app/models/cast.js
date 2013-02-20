var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var CastSchema = new Schema({
  name: String, 
  description: String,
  userId: Schema.Types.ObjectId
});

mongoose.model('Cast', CastSchema);