const mongoose = require('mongoose');


const GameSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Games', GameSchema);