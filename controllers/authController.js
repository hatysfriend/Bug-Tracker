const repo = require('../data/authRepository');
const authHelper = require('../authentication/authHelper');
const passport = require('../authentication/local');

module.exports = {

    register_a_user_get: async (req, res) => {
        res.render('register');
    },

    get_username: async (req, res) => {
        if(!req.user) {
            res.send("Dud");
        }
        else {
            console.log(req.user);
            res.send(req.user.username);
        }
    },

    register_a_user_post: async (req, res, next) => {
        let user = await authHelper.createEncryptedUser(req.body.username, req.body.password);
        repo.InsertUser(user)
            .then((response) => {
                passport.authenticate('local', (err, userReturn, info) => {                   
                    if(userReturn) {
                        login(userReturn, req, res);
                    }
                    else if(err) {
                        console.log(err);
                    }
                })(req, res, next);
            })
            .catch((err) => {
                res.redirect('/error');
            });
    },

    login_a_user_get: (req, res) => {
        res.render('login', {error: req.flash("error")});
    },

    login_a_user_post: (req, res, next) => {
        passport.authenticate('local', (err, userReturn, info) => {
            if(err) {
                req.flash('error', 'Login Failed. Mysterious...');  
                res.redirect('/auth/login');
            }
            if(!userReturn) {
                req.flash('error', 'Login Failed. User not found');
                res.redirect('/auth/login');
            }
            if(userReturn) {
                login(userReturn, req, res);
            }
        })(req, res, next);
    },
    
    logout_a_user: (req, res, next) => {
        req.logout();
        res.redirect('/');
    }
};


function login(userReturn, req, res) {
    req.logIn(userReturn, (err) => {
        if(err) {  
        }
        else{
            res.status(200);
            req.flash("success", "You are logged in, prepare to squash bugs.");
            // console.log(`Is ${userReturn} authenicated: ` + req.isAuthenticated());
            res.redirect('/');
        }
    });
}