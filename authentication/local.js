const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const repository = require('../data/authRepository');
const authHelper = require('./authHelper');
const init = require('./passport');
const options = {};

init();
console.log("Did Passport Run");

passport.use(new LocalStrategy(options, async (username, password, done) => {
    console.log(`USER FROM LOCAL : ${username} + ${password}`);
    repository.GetUser({username: username})
        .then( async (user)=> {
            if(!user) {
                return done(null, false); 
            }
            let result = await authHelper.comparePassword(password, user.password);
            console.log("result: "+ result);
            if(!result) {
                return done(null, false);
            }
            else {
                console.log("User Was OK: " +user);
                return done(null, user);
            }
        })
        .catch((err) => {
            return done(err);
        });
}));

module.exports = passport;