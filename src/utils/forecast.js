const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=142f323fdcc36466d4530ac0f83ee136&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            // console.log('error:')
            // console.log(error)
            callback('Unable to connect to weatherstack api', undefined)
        } else if (body.error) {
            // console.log('response:')
            // console.log(response)
            callback("Error retrieving the weather details, Check the latitude and longitude", undefined)
        } else {
            const current = body.current
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} out. It feels like ${current.feelslike} out now`)
        }
    })
}



module.exports = forecast