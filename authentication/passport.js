const passport = require('passport');
const repo = require('../data/authRepository');

module.exports = () => {
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        repo.GetUser({ _id: id })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    });

};