//login with facebook
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const Users = require('../services/user');
const Bluebird = require('bluebird');
const asyncHandler = require('express-async-handler');

//middleware-facebook
passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
    //passReqToCallback : true,
    profileFields: ['id' , 'emails' ,'displayName']
  },
  function(accessToken, refreshToken, profile, done) {
      Users.findOne({
          where: {
              email: profile.emails[0].value,
              facebookid: profile.id,
          },
      }).then(async function(found){
          if(found){
              found.facebookAccesstoken = accessToken;
              return found;
          }
          const user = await Users.create({
              email: profile.emails[0].value,
              displayname: profile.displayName,
              facebookid: profile.id,
              facebookAccesstoken: accessToken,
          });
          return user;
      }).asCallback(done);
  }
  ));
  
passport.serializeUser( function(user, done) {
    done(null, user.id);
  });
passport.deserializeUser( function(id, done) {
     Users.finduserbyid(id).then(function(user){
              done(null,user.id);
          }).catch(done);
});
module.exports = passport;