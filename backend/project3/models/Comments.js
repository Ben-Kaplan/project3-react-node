const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
  title: String,
  comment: String
});

module.exports = mongoose.model('Comments', CommentSchema);