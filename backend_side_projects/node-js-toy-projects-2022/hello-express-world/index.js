const express = require('express');
const app = express();

function logger(req, res, next) {
	console.log('i am logger');
}

app.use(logger);

app.listen(5000, function () {
	console.log('server is running');
});
