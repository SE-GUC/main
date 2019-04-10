const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const passport = require('passport')
const router = express.Router();

const User = require('../../models/User');
const validator = require('../../validations/userValidations');

const tokenKey = require('../../config/keys').secretOrKey

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json({ data: users })
});

router.post('/register', async (req, res) => {
	try {
		const isValidated = validator.registerValidation(req.body);
		if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
		const { email, age, name, password } = req.body;
		const user = await User.findOne({ email });
		if (user) return res.status(400).json({ email: 'Email already exists' });
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		const newUser = new User({
			name,
			password: hashedPassword,
			email,
			age,
		});
		await User.create(newUser);
		res.json({ msg: 'User created successfully', data: newUser });
	} catch (error) {
		res.status(422).send({ error: 'Can not create user' });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ email: 'Email does not exist' });
		const match = bcrypt.compareSync(password, user.password);
		if (match) {
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            const token = jwt.sign(payload, tokenKey, { expiresIn: '1h' })
            return res.json({token: `Bearer ${token}`})
        }
		else return res.status(400).send({ password: 'Wrong password' });
	} catch (e) {}
});


module.exports = router;
