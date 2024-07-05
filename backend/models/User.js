const mongoose=require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    producers:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producer",
      },
    ],
    actors:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor",
      },
    ],
    movies:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
