const express=require("express")
const bcrypt=require("bcrypt")
const app=express();
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const dotenv=require("dotenv").config();
const Bookmark=require("./models/Bookmark");

app.use(express.json());

const mongo_url=process.env.MONGO_URL;
const jwt_secret=process.env.JWT_SECRET;


if(!mongo_url || !jwt_secret){
    console.log("Error missing required environment variables");
    process.exit(1);
}
mongoose.connect(mongo_url).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("error connecting to database",err);
});

const router = express.Router();

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    let bookmarkDoc = await Bookmark.findOne({ username });

    // If user exists, verify password
    if (bookmarkDoc) {
      const isMatch = await bcrypt.compare(password, bookmarkDoc.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      // User doesn't exist, create new account
      const hashedPassword = await bcrypt.hash(password, 10);
      bookmarkDoc = await Bookmark.create({
        username,
        password: hashedPassword,
        bookmarks: []
      });
    }

    const token = jwt.sign(
      { bookmarkId: bookmarkDoc._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});




function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.bookmarkId = decoded.bookmarkId;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}


app.get("/api/bookmarks", authMiddleware, async (req, res) => {
  try {
    const bookmarkDoc = await Bookmark.findById(req.bookmarkId);
    if (!bookmarkDoc) {
      return res.status(404).json({ error: "bookmark not found" });
    }


    res.json({
      bookmarks: bookmarkDoc.bookmarks
    })
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/bookmarks", authMiddleware, async (req, res) => {
  const { title, url, tags } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "title and url are required" });
  }

  try {
    const bookmarkDoc = await Bookmark.findById(req.bookmarkId);
    if (!bookmarkDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    const bookmark = { title, url, tags };

    const updatedBookmarks = await Bookmark.findOneAndUpdate(
      { _id: bookmarkDoc._id },
      { $push: { bookmarks: bookmark } },
      { new: true }
    );

    res.json(updatedBookmarks);
  } catch (err) {
    console.error("Error adding bookmark:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log("listening on port 3000");
})