const express = require('express')
const hbs = require('hbs')

const router = new express.Router()

router.get('/', async (req, res) => {
    res.render('welcome')
  })

module.exports = router