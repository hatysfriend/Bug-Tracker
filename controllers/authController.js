const repo = require('../data/authRepository')();
const authHelper = require('../authentication/authHelper');
const passport = require('../authentication/local');

module.exports = {
    register_a_user: async (req, res, next) => {
        let user = await authHelper.createEncryptedUser(req.body.username, req.body.password);
        repo.InsertUser(user)
            .then((response) => {
                passport.authenticate('local', (errOne, userReturn, info) => {
                    if(userReturn) {
                        console.log("USER FOR REGISTER"+userReturn)
                        //res.redirect('/index');
                        handleResponse(res, 200, 'success');
                    }
                })(req, res, next);
            })
            .catch((err) => {
                console.log("Error?: " + err);
                handleResponse(res, 500, 'error');
                //res.redirect('/error');
            });
    },
    login_a_user: (req, res, next) => {
        passport.authenticate('local', (err, userReturn, info) => {
            // if(err) {
            //     handleResponse(res, 500, 'error');
            // }
            if(!userReturn) {
                console.log("USER????" + userReturn);
                handleResponse(res, 404, 'User not found');
            }
            if(userReturn) {
                req.logIn(user, (err) => {
                    if(err) {
                        handleResponse(res, 500, 'error');
                    }
                    else{
                        handleResponse(res, 200, 'success');
                    }
                })
            }
        })(req, res, next);
    }
};

function handleResponse(res, code, statusMsg) {
    res.status(code).json({status: statusMsg});
  }