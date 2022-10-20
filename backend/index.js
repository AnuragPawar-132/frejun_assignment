const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongo_connection = require("./config/config")

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send({
        "message": "Welcome to Homepage"
    })
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