var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  autor: String,
  text: String
});

var mongoURI = 'mongodb://localhost:27017/myCommentList'

var mongodb = mongoose.connect(mongoURI).connection;
mongodb.on('error', function(err){console.log(err.message);});
mongodb.once('open',function(){
  console.log('mongodb connection open');
})

module.exports = mongoose.model('Comment', CommentSchema);
