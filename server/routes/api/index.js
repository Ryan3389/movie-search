const router = require('express').Router()
const movieRoutes = require('./movieRoutes')

router.use('/movie', movieRoutes)

module.exports = router

