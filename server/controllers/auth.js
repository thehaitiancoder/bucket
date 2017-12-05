const User = require('mongoose').model('User');

module.exports = {
    getAllUsers(req, res){
        User.find()
        .then(users => res.json(users))
        .catch(console.log)
    },

    login(req, res){
        console.log(req.body)
        User.findOne({name: req.body.name})
        .then(user => {
            if(!user){
                User.create(req.body)
                .then(user => {
                    //handle login
                    userLogin(req, res, user);
                })
            }

            //handle login
            userLogin(req, res, user);
        })
        .catch(console.log)
    },

    logout(req, res){
        req.session.destroy();
        res.clearCookie('userId');
        res.clearCookie('expiration');
        res.clearCookie('name');
        res.json(true);
    }
}

function userLogin(req, res, user){
    req.session.user = user.toObject();

    res.cookie('userId', user._id.toString());
    res.cookie('name', user.name.toString());
    res.cookie('expiration', Date.now() + 86400 * 10000);

    res.json(user);
}