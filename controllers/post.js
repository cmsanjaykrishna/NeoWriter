const Post = require("../models/post")

exports.getPost = (req,res)=>{
    const posts = Post.find()
    .then(posts => res.json({posts:posts}))
    .catch(err=>console.log(err));    
};

exports.createPost = (req,res)=>{
    const post = new Post(req.body);
    //console.log(`Creating new post : `, post);
    post.save().then(result=>{
        res.json({
            post : result                
        });
    });
};