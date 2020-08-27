const repo = require('../data/authRepository')();
const authHelper = require('../authentication/authHelper');
const passport = require('../authentication/local');

module.exports = {
    register_a_user: async (req, res) => {
        let user = await authHelper.createEncryptedUser(req.body.username, req.body.password);
        repo.InsertUser(user)
            .then((response) => {
                console.log("User was put");
                passport.authenticate('local', (errOne, userReturn, info) => {
                    console.log("USER RETURN: "+ userReturn);
                    if(userReturn) {
                        res.redirect('/index');
                    }
                })();
            })
            .catch((err) => {
                console.log("Error?");
                //console.log(err);
                res.redirect('/error');
            });
    } 
};