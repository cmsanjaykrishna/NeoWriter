const Post = require("../models/post")

exports.getPost = (req,res)=>{
    res.json({
        posts:[{title : 'First post'}, {title : 'Second post'}]    
    });
};

exports.createPost = (req,res)=>{
    const post = new Post(req.body);
    //console.log(`Creating new post : `, post);
    post.save().then(result=>{
        res.status(200).json({
            post : result                
        });
    });
};