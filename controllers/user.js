const _ = require('lodash')
const User = require("../models/user")

exports.userById = (req, res, next, userId) => {
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
}

exports.hasAuthorisation = (req, res, next) => {
    const authorised = req.profile && req.auth && req.profile.id == req.auth.id
    if (!authorised) {
        return res.status(403).json({
            error: "User not authorised"
        });
    }
}

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: "error getting users"
            });
        }
        res.json({ users });
    }).select("name email updated created");
}

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res, next) => {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save((err) => {
        if (err) {
            return res.status(400).json({
                error: "You are not authorised to perform this action"
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({user});
    });
}

exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({user})
    });
}