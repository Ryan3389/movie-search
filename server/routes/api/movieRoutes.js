const router = require('express').Router()

const { movieSearch } = require('../../controllers/movieControllers')

router.route('/').post(movieSearch)

module.exports = router