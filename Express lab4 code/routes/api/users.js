// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const users = require('../../models/User');

// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

// Get all users
router.get('/', (req, res) => res.json({ data: users }));

// Create a new user
router.post('/', (req, res) => {
	const name = req.body.name;
	const age = req.body.age;

	if (!name) return res.status(400).send({ err: 'Name field is required' });
	if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
	if (!age) return res.status(400).send({ err: 'Age field is required' });
	if (typeof age !== 'number') return res.status(400).send({ err: 'Invalid value for age' });

	const newUser = {
		name,
		age,
		id: uuid.v4(),
	};
	return res.json({ data: newUser });
});

router.post('/joi', (req, res) => {
	const name = req.body.name
    const age = req.body.age

    const schema = {
        name: Joi.string().min(3).required(),
        age: Joi.number().required(),
    }

	const result = Joi.validate(req.body, schema);

	if (result.error)return res.status(400).send({ error: result.error.details[0].message });
	
	const newUser = {
		name,
		age,
		id: uuid.v4(),
	};
	return res.json({ data: newUser });
});

module.exports = router;
