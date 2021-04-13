const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  contentMessage: {
    type: String,
    required: true
  },
  // time: {
  //   type: Date,
  //   required: false
  // },
  // systemMessage: {
  //   type: Boolean,
  //   required: true
  // },
  
});

module.exports = mongoose.model('Message', Schema);