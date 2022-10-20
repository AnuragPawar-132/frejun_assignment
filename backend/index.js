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
    res.send(post_list)
})

app.get("/posts/:id", async(req, res)=>{
    let id = req.params.id
    const required_post = await PostModel.findOne({_id: id})
    res.send(required_post)
})

app.get("/posts/:id/start-with-a", async(req, res)=>{
    let id = req.params.id
    const target_post = await PostModel.findOne({_id: id})
    let arr = [];
    let new_body = target_post.body.split(" ");
    for(let i=0; i<new_body.length; i++)
    {
        if(new_body[i][0]==="a" || new_body[i][0]==="A")
        {
            arr.push(new_body[i])
        }
    }
    res.send("Successfull")
})

app.get("/posts/:id/change-with-*", async(req, res)=>{
    let id = req.params.id
    const target_post = await PostModel.findOne({_id: id})
    let new_body = target_post.body.split(" ");
    for(let i=0; i<new_body.length; i++)
    {
        if(new_body[i][0]==="a" || new_body[i][0]==="A")
        {
            // let len = new_body[i].length
            let seperated_str = new_body[i].split("")
            if(seperated_str[seperated_str.length-1]!==undefined)
            {
                seperated_str[seperated_str.length-1] = "*"
            }
            if(seperated_str[seperated_str.length-2]!==undefined)
            {
                seperated_str[seperated_str.length-2] = "*"
            }
            if(seperated_str[seperated_str.length-3]!==undefined)
            {
                seperated_str[seperated_str.length-3] = "*"
            }
            new_body[i] = seperated_str.join("")
        }
    }
    let updated_body = new_body.join(" ")
    console.log(updated_body)
    await PostModel.findOneAndUpdate({_id: id}, {$set: {body: updated_body}})
    await PostModel.find
    res.send("arr")
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