const express = require("express");
const {createPost, getPost} = require("../controllers/post");
const {createPostValidator} = require("../validators/index");

const router = express.Router();

router.get("/", getPost);
router.post("/post/create", createPostValidator, createPost);

module.exports = router;