const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsDirectoryPath = path.join(__dirname, '..', 'templates', 'views')

const partialsDirectoryPath = path.join(__dirname, '..', 'templates', 'partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

hbs.registerPartials(partialsDirectoryPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bala'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bala Pothina'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Bala Pothina'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'No address is available'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                address,
                forecast,
                location
            })
        }
        )
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server started at ', port)
})