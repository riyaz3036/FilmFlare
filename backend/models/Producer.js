const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producer", producerSchema);
