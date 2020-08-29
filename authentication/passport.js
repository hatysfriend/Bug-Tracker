const passport = require('passport');
const repo = require('../data/authRepository');

module.exports = () => {
    
    passport.serializeUser((user, done) => {
        console.log("USER serialize Used...........")
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        console.log("User Deserialized...........");
        repo.GetUser({ username: user.username })
            .then((userReturn) => {
                console.log("We GOt HTe USer"+ userReturn);
                done(null, userReturn);
            })
            .catch((err) => {
                done(err, null);
            });
    });
};