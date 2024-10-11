const router = require('express').Router()

const { storeMovieDB, queryDb } = require('../../controllers/movieControllers')

router.route('/').post(storeMovieDB)
router.route('/query').post(queryDb)

module.exports = router