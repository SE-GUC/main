const express = require('express')
const router = express.Router()

router.get('/', (req,res) => res.json({data: 'Comments working'}))

module.exports = router