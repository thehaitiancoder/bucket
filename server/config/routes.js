const authController = require('../controllers/auth');
const bucketController = require('../controllers/bucket');
const path = require('path');

module.exports = function(app){
    app.get('/auth/login', authController.getAllUsers);
    app.post('/auth/login', authController.login);
    app.delete('/auth/login', authController.logout);

    app.get('/api/bucket', bucketController.getAll);
    app.post('/api/bucket', bucketController.create);
    app.put('/api/bucket/:id', bucketController.update);
    app.get('/api/bucket/user/:loggedUserId', bucketController.getActiveUserList);
    app.get('/api/bucket/loggedUserTaggedBucket/:loggedUserId', bucketController.getActiverUserTaggedBucket)

    app.all('*', function(req, res){
        res.sendFile(path.resolve('dist', 'index.html'));
    })
}