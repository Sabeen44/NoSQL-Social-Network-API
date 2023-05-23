const Thought = require("../models/Thought");
const User = require("../models/Thought");

module.exports = {
  // GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a Thought
  createThought(req, res) {
    console.log(req.body.userId);
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          //console.log(req.body.userId);
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        ).then((user) => {
          console.log(user);
          if (!user) {
            return res
              .status(404)
              .json({ message: "No user found with that ID :(" });
          }
          return res.json(user);
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(
        (thought) => {
          if (!thought) {
            res.json({ message: "User and thoughts deleted!" });
          }
        }
        //? res.status(404).json({ message: "No thought with that ID" })
        //: User.deleteMany({ _id: { $in: thought.username } })
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },

      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with that ID" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
