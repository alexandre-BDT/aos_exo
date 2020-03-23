const express = require('express');
const router = express.Router();
const user = require('./../models/schema')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

function hashPassword(password) {
	const hash = bcrypt.hashSync(password, salt);
	return hash
}

async function checkPassword(password, userPassword) {
	const match = bcrypt.compare(password, userPassword)
	return match
}

router.post('/register', (req, res, next) => {
	const { email, password1, password2 } = req.headers
	var error = []
	if (!email || !password1 || !password2) {
		error.push({msg: 'Please fill all the textfields'})
	} else if (password1 !== password2) {
		error.push({msg: 'Passwords not identical'})
	} else {
		user.findOne({email: email}).then(result => {
			if (result) {
				res.status(401).send('User already exist')
			} else {
				const hashedPassword = hashPassword(password1)
				var newUser = user.create({email: email, password: hashedPassword},
					function(err, model) {
						if (err)
							return console.log(err)
					})
				res.status(200).send('User registered')
			}
		})
	}
})

router.get('/login', (req, res, next) => {
	try {
		const { email, password } = req.headers
		if (!email || !password)
			res.status(403).send('empty field')
		else {
			user.findOne({email: email}).then(result => {
				if (result == null)
					return res.status(404).send()
				Promise.resolve(checkPassword(password, result.password))
				.then((response) => {
					if (response)
						res.sendStatus(200)
					else
						res.sendStatus(403)
				}).catch((err) => next(err))
			}).catch((err) => next(err))
		}
	} catch(err) {
		next(err)
	}
})

module.exports = router