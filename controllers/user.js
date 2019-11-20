const User = require("../models/user")

exports.userById = (req, res, userId) => {
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            res.status(400).json({
                error: "User not found"
            });
        }
        res.profile = user;
        next();
    }); 
       
};

exports.hasAuthorisation = (req, res, next) => {
    const authorised = req.profile && req.auth && req.profile.id == req.auth.id
    if (!authorised) {
        return res.status(403).json({
            error: "User not authorised"
        });
    }
};

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: "error getting users"
            });
        }
        res.json({ users });
    }).select("name email updated created");
};

exports.getUser = (req,res) => {
    return res.json(req.profile);
};