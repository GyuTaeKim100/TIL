const app = require('../index');
const syncDb = require('./sync-db');

const port = 13000;

syncDb().then((_) => {
	console.log('Sync database');
	app.listen(port, () => {
		console.log(`Server is running on 13000 ${port} port`);
	});
});
