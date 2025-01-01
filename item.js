const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Item', itemSchema);
