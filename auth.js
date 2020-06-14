const passport = require('passport');
// const { Strategy, ExtractJwt } = require('passport-jwt'); 
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

require('dotenv').config();

const User = require('./models/User');

module.exports = (app) => {
    const opts = {
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
    }

    const localStrategy = new Strategy(opts, (payload, done) => {
        User.findById(payload.id).then(user => {
            if(user){
                return done(null, {
                    id: user.id,
                    email:user.email
                })
            }
            return done(null, false);
        })
        .catch(error => done(error, null));
    });

    passport.use(localStrategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", { jwtSession: false });
        }
    }
}