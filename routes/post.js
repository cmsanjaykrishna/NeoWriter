const express = require("express");
const {createPost, getPost} = require("../controllers/post");
const {createPostValidator} = require("../validators/index");
const {requireSignIn} = require("../controllers/auth");
const {userById} = require("../controllers/user");

const router = express.Router();

router.get("/", getPost);
router.post("/post", requireSignIn, createPostValidator, createPost);

router.param("userId", userById);

module.exports = router;