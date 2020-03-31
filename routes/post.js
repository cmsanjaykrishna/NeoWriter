const express = require("express");
const {
    createPost,
    postById,
    postsByUserId,
    isPoster,
    deletePost
} = require("../controllers/post");
const {
    createPostValidator
} = require("../validators/index");
const {
    requireSignIn
} = require("../controllers/auth");
const {
    userById
} = require("../controllers/user");

const router = express.Router();

router.post('/post/new/:userId', requireSignIn, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignIn, postsByUserId);
router.delete('/post/:postId', requireSignIn, isPoster, deletePost);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;