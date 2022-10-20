const mongoose = require("mongoose");

const post_schema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    category: {type: String, required: true}
})

const PostModel = mongoose.model("post", post_schema)

module.exports = PostModel