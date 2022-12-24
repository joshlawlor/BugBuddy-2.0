const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/postCtrl')


router.get('/', postCtrl.showAll)


module.exports = router