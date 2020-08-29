const passport = require('passport');
const repo = require('../data/authRepository');

module.exports = () => {
    
    passport.serializeUser((user, done) => {
        console.log("USER serialize Used...........")
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log("User Deserialized...........");
        repo.GetUser({ _id: id })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    });
};