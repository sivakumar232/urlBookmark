const express=require("express")
const bcrypt=require("bcrypt")
const app=express();
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const dotenv=require("dotenv").config();
const Bookmark=require("./models/Bookmark");
const cors=require("cors");
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

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

//user signup

app.post("/api/auth/signup",async(req,res)=>{
    try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const existingUser = await Bookmark.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Bookmark.create({
      username,
      password: hashedPassword,
      bookmarks: []
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }

})


//user login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received login:", username);

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

   const bookmarkDoc = await Bookmark.findOne({ username });
    if (!bookmarkDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, bookmarkDoc.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { bookmarkId: bookmarkDoc._id, username: bookmarkDoc.username },
      process.env.JWT_SECRET || "default_secret",  
      { expiresIn: "7d" }
    );

    res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"}).json({message:"success",token:token});

  } catch (err) {
    console.error("Login error:", err);  
    res.status(500).json({ error: "Server error" });
  }
});


//auth checking middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
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


//get bookmarks
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


//add bookmark
app.post("/api/bookmarks", authMiddleware, async (req, res) => {
  const { title, url } = req.body;

  if ( !url) {
    return res.status(400).json({ error: "url is required" });
  }

  try {
    const bookmarkDoc = await Bookmark.findById(req.bookmarkId);
    if (!bookmarkDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    const bookmark = { title, url };

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


///delete bookmark
app.delete("/api/bookmarks/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Bookmark.findById(req.bookmarkId); // user is the document

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the bookmark with the given _id from the user's bookmarks array
    user.bookmarks = user.bookmarks.filter(
      (bookmark) => bookmark._id.toString() !== id
    );

    await user.save();

    res.json({ message: "Bookmark deleted successfully", bookmarks: user.bookmarks });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log("listening on port 3000");
})