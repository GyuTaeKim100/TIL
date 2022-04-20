const models = require('../../models');

const index = function (req, res) {
	req.query.limit = req.query.limit || 10;
	const limit = parseInt(req.query.limit, 10);

	if (Number.isNaN(limit)) {
		return res.status(400).end();
	}

	models.User.findAll({
		limit: limit,
	}).then((users) => {
		res.json(users);
	});
};

const show = function (req, res) {
	const id = parseInt(req.params.id, 10);

	if (Number.isNaN(id)) {
		return res.status(400).end();
	}

	models.User.findOne({
		where: {
			id,
		},
	}).then((user) => {
		if (!user) {
			return res.status(404).end();
		}

		res.json(user);
	});
};

const destroy = async (req, res) => {
	const id = parseInt(req.params.id, 10);

	if (Number.isNaN(id)) return res.status(400).end();

	try {
		const user = await models.User.findOne({ where: { id } });
		await user.destroy().then(() => {
			res.status(204).end();
		});
	} catch (e) {}
};

const create = (req, res) => {
	const name = req.body.name;

	if (!name) {
		return res.status(400).end();
	}

	models.User.create({ name })
		.then((user) => {
			return res.status(201).json(user);
		})
		.catch((err) => {
			if (err.name === 'SequelizeUniqueConstraintError') {
				return res.status(409).end();
			}

			res.status(500).end();
		});
};

const update = (req, res) => {
	const id = parseInt(req.params.id, 10);

	if (Number.isNaN(id)) return res.status(400).end();

	const name = req.body.name;

	if (!name) return res.status(404).end();

	const isConlict = users.filter((user) => user.name === name).length > 0;
	if (isConlict) {
		return res.status(409).end();
	}

	const user = users.filter((user) => user.id === id)[0];

	if (!user) return res.status(404).end();

	user.name = name;

	res.json(user);
};

module.exports = {
	index,
	show,
	destroy,
	create,
	update,
};
