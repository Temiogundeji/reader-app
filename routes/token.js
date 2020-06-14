const jwt = require('jwt-simple');
const User = require('../models/User');
const app = require('../app');

require('dotenv').config();

module.exports = () => {
    app.post('/token', ( req, res ) => {
        const { email, password } = req.body;
        if(email && password){
            User.findOne({ where: { email }})
            .then(user => {
                const payload = { id:user.id };
                User.isPassword(user.password, password) ? 
                res.json({ token: jwt.encode(payload, process.env.SECRET_KEY)}) :
                res.sendStatus(401);

            })
            .catch(error => res.sendStatus(401));
        }
        else{
            res.sendStatus(401);
        }
    });
}