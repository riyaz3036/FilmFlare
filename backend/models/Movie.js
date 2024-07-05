const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number, 
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
    },
  ],
  producer: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Producer' 
  }
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
