const path = require('path');
const Router = require('express')
const ImageController = require('./ImageController')

const router = new Router()

router.post('/image', ImageController.writeImage)
router.get('/image', ImageController.getImage)

module.exports = router
