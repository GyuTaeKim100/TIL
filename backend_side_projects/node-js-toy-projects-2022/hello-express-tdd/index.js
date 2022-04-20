const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const user = require('./api/user');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

app.use('/users', user);

app.listen(5000, function () {
	console.log('server is running on port 5000');
});

module.exports = app;
