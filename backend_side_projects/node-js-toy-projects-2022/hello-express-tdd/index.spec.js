const reqest = require('supertest');
const app = require('./index');

describe('GET /users는', () => {
	it('...', (done) => {
		reqest(app)
			.get('/users')
			.end((err, res) => {
				console.log(res.body);
				done();
			});
	});
});
