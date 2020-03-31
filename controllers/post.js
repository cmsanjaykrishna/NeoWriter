const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");

exports.getPost = (req, res) => {
    const posts = Post.find()
        .populate("postedBy", "_id name")
        .select("_id title body")
        .then(posts => res.json({
            posts: posts
        }))
        .catch(err => console.log(err));
}

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let post = new Post(fields);
        post.postedBy = req.profile;
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });

    /* const post = new Post(req.body);
    post.postedBy = req.profile;
    //console.log(`Creating new post : `, post);
    post.save().then(result => {
        res.json({
            post: result
        });
    }); */
}

exports.postsByUser = (req, res) => {
    Post.find({
            postedBy: req.profile._id
        })
        .populate("postedBy", "_id name")
        .sort("_created")
        .exec((err, posts) => {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(posts);
        });
}