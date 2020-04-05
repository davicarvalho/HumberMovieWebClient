const express = require('express')
const hbs = require('hbs')
const path = require('path')

const welcome = require('./routers/welcome')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(welcome)

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.listen(port, () => console.log(`App running on port ${port}`))

module.exports = app