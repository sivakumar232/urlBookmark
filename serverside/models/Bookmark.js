const mongoose = require("mongoose");

const { Schema } = mongoose;

const individualBookmarkSchema = new Schema({
  title: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const bookmarkSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String,
    required: true
  },
  bookmarks: [individualBookmarkSchema]
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
