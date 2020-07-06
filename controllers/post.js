const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require ("lodash");

exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate('postedBy', '_id name')
        /* .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name role')
        .select('_id title body created likes comments photo') */
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                });
            }
            req.post = post;
            next();
        });
};

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

exports.postsByUserId = (req, res) => {
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

exports.isPoster = (req, res, next) => {
    let sameUser = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    let adminUser = req.post && req.auth && req.auth.role === 'admin';

    // console.log("req.post ", req.post, " req.auth ", req.auth);
    // console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isPoster = sameUser || adminUser;

    if (!isPoster) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};

exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Post deleted successfully'
        });
    });
};

exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body);
    post.updated = Date.now();
    post.save((err) => {
        if (err) {
            return res.status(400).json({
                error: "You are not authorised to perform this action"
            });
        }
        res.json({post});
    });
}