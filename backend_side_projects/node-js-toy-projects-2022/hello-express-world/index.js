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

app.listen(5000, function () {
	console.log('server is running on port 5000');
});
