exports.createPostValidator = (req, res, next) => {

    //title
    req.check('title', "Title is empty").notEmpty();
    req.check('title', 'title must be between 4 and 150 chars').isLength({
        min: 4,
        max: 150
    });

    //body
    req.check('body', "Body is empty").notEmpty
    req.check('body', 'Body must be between 4 and 2000 chars').isLength({
        min: 4,
        max: 2000
    });

    const errors = req.validationErrors();

    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }

    next();
};

exports.userSignupValidator = (req, res, next) => {

    //name
    req.check('name', "Name is empty").notEmpty();

    //email
    req.check('email', "Email is empty").notEmpty();
    req.check('email', 'Email must be between 4 and 150 chars')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must be of the format abc@xyz.com")
        .isLength({
            min: 4,
            max: 150
        });

    //password
    req.check('password', "Password is empty").notEmpty();
    req.check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be more than 5 chars')
        .matches(/\d/)
        .withMessage('Password must contain atleast one number');

    //errors
    const errors = req.validationErrors();

    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }

    next();
};