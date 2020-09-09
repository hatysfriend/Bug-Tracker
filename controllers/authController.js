const repo = require('../data/authRepository');
const authHelper = require('../authentication/authHelper');
const passport = require('../authentication/local');

module.exports = {

    register_a_user_get: async (req, res) => {
        res.render('register');
    },

    register_a_user_post: async (req, res, next) => {
        let user = await authHelper.createEncryptedUser(req.body.username, req.body.password);
        repo.InsertUser(user)
            .then((response) => {
                passport.authenticate('local', (err, userReturn, info) => {                   
                    if(userReturn) {
                        console.log("USER IS LOGGED IN AFTER REG");
                        handleResponse(res, 200, 'success');
                    }
                    else if(err) {
                        console.log(err);
                    }
                })(req, res, next);
            })
            .catch((err) => {
                handleResponse(res, 500, 'error');
                //res.redirect('/error');
            });
    },

    login_a_user_get: (req, res) => {
        res.render('login');
    },

    login_a_user_post: (req, res, next) => {
        passport.authenticate('local', (err, userReturn, info) => {
            if(err) {
                handleResponse(res, 500, 'error');
            }
            if(!userReturn) {
                handleResponse(res, 404, 'User not found');
            }
            if(userReturn) {
                req.logIn(userReturn, (err) => {
                    if(err) {
                        handleResponse(res, 500, 'error');
                    }
                    else{
                        res.redirect('/');
                    }
                })
            }
        })(req, res, next);
    },
    
    logout_a_user: (req, res, next) => {
        req.logout();
        handleResponse(res, 200, 'success');
    }
};

function handleResponse(res, code, statusMsg) {
    res.status(code).json({status: statusMsg});
}