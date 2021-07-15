const { Schema, model } = require('mongoose');
const replySchema = require('./Reply');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema(
  {
    messageText: {
      type: String,
      required: 'Enter your message!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    replies: [replySchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Message = model('Message', messageSchema);

module.exports = Message;
