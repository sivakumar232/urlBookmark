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


app.post("/api/auth/login", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  const allBookmarks = await Bookmark.find();

  let bookmarkDoc = null;
  for (let doc of allBookmarks) {
    const isMatch = await bcrypt.compare(code, doc.code);
    if (isMatch) {
      bookmarkDoc = doc;
      break;
    }
  }

  if (!bookmarkDoc) {
    const hashedCode = await bcrypt.hash(code, 10);
    bookmarkDoc = await Bookmark.create({
      code: hashedCode,
      bookmarks: []
    });
  }



//token creation 
const token = jwt.sign(
  { bookmarkId: bookmarkDoc._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
 res.json({
    token:`${token}`
 })

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
      return res.status(404).json({ error: "Bookmark not found" });
    }

    res.json({ bookmarks: bookmarkDoc.bookmarks });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/bookmarks", async (req, res) => {
    const { code, title, url, tags } = req.body;
    if (!code || !title || !url) {
        return res.status(400).json({ error: "code,title,url are required" });
    }
    const bookmark = { title, url, tags };
    try {
        const updatedBookmarks = await Bookmark.findOneAndUpdate(
            { code },
            { $push: { bookmarks: bookmark } },
            { new: true }
        );
        (!updatedBookmarks)
            ? res.status(404).json({ error: "code not found" })
            : res.json(updatedBookmarks);
    } catch (err) {
        console.log("error adding bookmark", err);
        res.status(500).json({ error: "internal server error" });
    }
});



const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log("listening on port 3000");
})