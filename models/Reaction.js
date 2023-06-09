////const Thought = require("./Thought");
const User = require("./User");
const { Schema, Types } = require("mongoose");

ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },

  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },

  username: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => moment(timestamp).format("MMM Do, YYYY [at] hh:mm a"),
  },
});

module.exports = ReactionSchema;
