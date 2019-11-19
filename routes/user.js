const express = require("express");
const {userById, allUsers, getUser} = require("../controllers/user");

const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId", getUser);

router.param("userId", userById);

module.exports = router;