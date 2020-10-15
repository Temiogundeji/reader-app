const express = require("express");

const router = express.Router();

//Only the authorized user gets access to the following route

router.get('/profile', (req,res, next) => {
    //We'll just send back the user details and the token
    res.json({
        message: 'Welcome to your profile, you are authentic!',
        user: req.user,
        token: req.query.secret_token
    });
});