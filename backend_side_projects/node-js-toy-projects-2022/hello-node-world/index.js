const http = require('http');

const hostname = '127.0.0.1';
const port = 3005;

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Hello World22\n');
	} else if (req.url === '/users') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('User list~');
	} else {
		res.statusCode = 404;
		res.end('Not Found!');
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// http 요청을 보낼 수 있는 커멘드라인 명령어
// curl -X GET 'localhost:3000'

// express framework를 사용 하는 이유?
