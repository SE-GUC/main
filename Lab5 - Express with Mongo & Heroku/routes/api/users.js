const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/User')

router.get('/', (req,res) => res.json({data: 'Users working'}))

router.post('/register', async (req,res) => {
    const { email, age, name, password }  = req.body
    const user = await User.findOne({email})
    if(user) return res.status(400).json({error: 'Email already exists'})
    
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    const newUser = new User({
            name,
            password: hashedPassword ,
            email,
            age
        })
    newUser
    .save()
    .then(user => res.json({data: user}))
    .catch(err => res.json({error: 'Can not create user'}))
})

module.exports = router