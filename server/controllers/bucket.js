const Bucket = require('mongoose').model('Bucket');

module.exports = {
    getAll(req, res){
        Bucket.find()
        .then(buckets => res.json(buckets))
        .catch(console.log)
    },

    getActiveUserList(req, res){
        Bucket.find({user: req.params.loggedUserId}).populate('taggedUser').populate('user')
        .then(buckets => res.json(buckets))
        .catch(console.log)
    },

    getActiverUserTaggedBucket(req, res){
        Bucket.find({taggedUser: req.params.loggedUserId}).populate('taggedUser').populate('user')
        .then(buckets => res.json(buckets))
        .catch(console.log)
    },

    create(req, res){
        Bucket.create(req.body)
        .then(bucket => res.json(bucket))
        .catch(console.log)
    },

    update(req, res){
        console.log(req.params.id)
        Bucket.findByIdAndUpdate({_id: req.params.id}, {
            $set: {
                status: req.body.status
            }
        })
        .then(updated_bucket => res.json(updated_bucket))
        .catch(console.log)
    }
}