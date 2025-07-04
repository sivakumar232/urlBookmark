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


app.post("/code", async(req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  let bookmarkDoc= await Bookmark.findOne({code});

  if(!bookmarkDoc){
    bookmarkDoc=await Bookmark.create({code,bookmarks:[]})
  }

  res.json({ message: "Code received", code });
});

app.get("/search",async (req, res) =>{
    const {code} =req.body;
    if(!code){
        return res.json({
            message:"code is required"
        })
    }
    let bookmarkDoc=await Bookmark.findOne({code});
    if(!bookmarkDoc){
        res.status(404).json({
            error:"code not found"
        })
    }
    else{
        res.json({
            bookmarks:bookmarkDoc.bookmarks
        })
    }
})

app.post("/bookmarks", async (req, res) => {
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