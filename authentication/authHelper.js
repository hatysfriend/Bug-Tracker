const bcrypt = require('bcryptjs');

function comparePassword(userPassword, databasePassword) {
    return bcrypt.compare(userPassword, databasePassword);
};

async function createEncryptedUser (username, password) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    let user = {
        username: username,
        password: hash
    }
    return user;
}

function loginRequired(req, res, next) {
    if(!req.user) {
        return res.status(401).json({status: 'Please Login Mate!'});
    }
    return next();
}

function loginRedirect(req, res, next) {
    if(!req.user) {
        res.redirect('/auth/login');
    }
    else {
        return next();
    } 
}

function checkAlreadyAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect('/');
        //Add Flash To Telle Them They Are Stubid
    }else{
        next();
    }
}



module.exports = {
    loginRequired,
    comparePassword,
    createEncryptedUser,
    loginRedirect,
    checkAlreadyAuthenticated
};