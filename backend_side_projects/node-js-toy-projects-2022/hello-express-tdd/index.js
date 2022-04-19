const express = require('express');
const morgan = require('morgan');

const app = express();

// 공통 미들웨어
function commonmw(req, res, next) {
	console.log('commonmw');
	next(new Error('error ouccered'));
}

// 에러 미들웨어
function errormw(err, req, res, next) {
	console.log(err.message);
	next();
}

app.use(commonmw);
app.use(errormw);
app.use(morgan('dev'));

app.get('/', function (req, res) {
	res.send('hello world');
});

const users = [
	{ id: 1, name: '1' },
	{ id: 2, name: '2' },
	{ id: 3, name: '3' },
	{ id: 4, name: '4' },
	{ id: 5, name: '5' },
];

app.get('/users', function (req, res) {
	res.json(users);
});

app.listen(5000, function () {
	console.log('server is running on port 5000');
});

module.exports = app;
