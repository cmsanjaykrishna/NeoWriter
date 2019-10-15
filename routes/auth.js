const express = require("express");

const {signUp,signIn,signOut} = require("../controllers/auth");
const {userSignupValidator} = require("../validators/index");

const router = express.Router();

router.post("/signUp", userSignupValidator, signUp);
router.post("/signIn", signIn);
router.get("/signOut", signOut);

module.exports = router;