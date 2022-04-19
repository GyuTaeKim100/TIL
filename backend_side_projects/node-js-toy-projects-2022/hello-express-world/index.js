const express = require('express');
const morgan = require('morgan');

const app = express();

// 로거 미들웨어
function logger(req, res, next) {
	// console.log('i am logger');
	next();
}

// 로거2 미들웨어
function logger2(req, res, next) {
	// console.log('i am logger2');
	next();
}

app.use(logger);
app.use(logger2);
app.use(morgan('dev'));

app.listen(5000, function () {
	console.log('server is running');
});
