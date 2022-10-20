const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongo_connection = require("./config/config")
const PostModel = require("./models/Postmodel")

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send({
        "message": "Welcome to Homepage"
    })
})

app.get("/posts", async (req, res)=>{
    const post_list = await PostModel.find()
    res.send({
        "message": "You can see post here",
        "data": post_list
    })
})

app.post("/create", async (req, res)=>{
    const {title, body, category} = req.body;
    const new_post = await new PostModel({
        title: title,
        body: body,
        category: category
    })
    new_post.save()
    res.send({
        "message": "Post created successfully"
    })
})

app.post("/posts", (req, res)=>{

})

app.listen(process.env.PORT, async ()=>{
    console.log("server started on 8000")
    try{
        await mongo_connection
        console.log("Connected to mongoDB")
    }
    catch(err){
        console.log(err)
    }
})