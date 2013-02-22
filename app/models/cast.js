var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var CastSchema = new Schema({
  name: String, 
  description: String,
  url: String,
  readme: String,
  summary: String,
  user: {type : Schema.ObjectId, ref : 'User'},
  tags: Array,
  createdAt: Date,
  updatedAt: Date
});

mongoose.model('Cast', CastSchema);