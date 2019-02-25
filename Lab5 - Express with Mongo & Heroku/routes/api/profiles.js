const express = require('express')
const router = express.Router()

router.get('/', (req,res) => res.json({data: 'Porfiles working'}))

module.exports = router