const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add a Name"],
    },
    email: {
      type: String,
      required: [true, "Please Add an Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Add a Password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports=mongoose.model('Users', schema)