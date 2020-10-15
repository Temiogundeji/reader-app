const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models').User;
const JWTStrategy = require('passport-jwt').Strategy;
//To extract JWT token sent by the user.
const ExtractJWT = require('passport-jwt').ExtractJwt;

const secret = require('../config.js');

//Passport middleware to handle user registration
passport.use('signup', new localStrategy({
    usernameField : 'username',
    passwordField : 'password'
  }, async (email, password, done) => {
      try {
        //Save the information provided by the user to the the database
        const user = await UserModel.create({ email, password });
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
       return done(error);
      }
  }));
  

//Passport middleware to handle user login
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try{
        const user = await UserModel.findOne({ email });
        if(!user){
            return done(null, false, { message: 'User not found' });
        }
        
        const validate = await user.isPassword(password);
        if(!validate){
            return done(null, false, { message:'Wrong Password'});
        }
        return done(null, user, { message: 'Logged in Successfully!'});
    }
    catch(error){
        return done(error);
    }
}));

//This verifies that the token sent by the user is valid
passport.use(new JWTStrategy({
    //The secret we used to sign our JWT
    secretOrKey: secret.jwtSecret,
    //We expect the user to send the token as a query paramater with the name 'secret_token'
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')

}, async (token, done) => {
    try{
        return done(null, token.user);
    }
    catch(error){
        done(error);
    }
}));
