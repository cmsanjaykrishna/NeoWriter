const express = require("express");
const {createPost, getPost} = require("../controllers/post");
const validators = require("../validators/index");

const router = express.Router();

router.get("/", getPost);
router.post("/post/create", validators.createPostValidator, createPost);

module.exports = router;