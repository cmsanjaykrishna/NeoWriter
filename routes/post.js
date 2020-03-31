const express = require("express");
const { createPost, getPost, postsByUser } = require("../controllers/post");
const { createPostValidator } = require("../validators/index");
const { requireSignIn } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const router = express.Router();

router.get("/", getPost);
router.post("/post/new/:userId", requireSignIn, createPost, createPostValidator);
router.get("/posts/by/:userId", postsByUser);

router.param("userId", userById);

module.exports = router;