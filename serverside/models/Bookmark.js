const mongoose= require("mongoose")

const { Schema } = mongoose;

const individualBookmarkSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  tags: [String],
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const bookmarkSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  bookmarks: [individualBookmarkSchema]
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports=Bookmark