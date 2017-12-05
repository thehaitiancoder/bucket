const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const reg = RegExp('\\.js$', 'i');

const modelsPath = path.resolve('server', 'models');

mongoose.connect('mongodb://localhost/buckets');
mongoose.connection.on('connected', () => console.log('We are connected to the db'));

mongoose.Promise = global.Promise

fs.readdirSync(modelsPath).forEach(file => {
    if (reg.test(file)) {
        require(path.join(modelsPath, file));
    }
});