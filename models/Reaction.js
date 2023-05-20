// const Thought = require("./Thought");
// const User = require("./User");

// ReactionSchema = new Schema({
//   reactionId: {
//     type: Schema.Types.ObjectId,
//     default: () => new mongoose.Types.ObjectId(),
//   },

//   reactionBody: {
//     type: String,
//     required: true,
//     maxlength: 280,
//   },

//   username: {
//     type: String,
//     required: true,
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//     // use a getter method to format the timestamp on query
//     get: (timestamp) => moment(timestamp).format("MMM Do, YYYY [at] hh:mm a"),
//   },
// });

// const Reaction = model("reaction", ReactionSchema);
// module.exports = Reaction;
