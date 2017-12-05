const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.port || 8000;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const sessionConfig = {
    saveUninitialized: true,
    secret: 'sessionSecret',
    resave: false,
    name: 'session',
    rolling: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 360000
    }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('efret755rdg5tefgdrgdr'));
app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, 'dist')));


require('./server/config/database');
require('./server/config/routes')(app);

app.listen(port, () => console.log(`The server is listenning on port ${port}`));