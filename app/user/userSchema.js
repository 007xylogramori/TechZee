const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    role:{
      type:String,
      default:"student",
      require:true
    },
    password: {
      type: String,
      require: true,
    },
    favourite: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Classes",
      },
    ],

    tokens: {
      accessToken: {
        token: String,
        expireAt: Date,
      },
      refreshToken: {
        token: String,
        expireAt: Date,
      },
    },
  },
  { timestamps: true }
);

const userSchema = mongoose.model("User", schema);

module.exports = userSchema;
