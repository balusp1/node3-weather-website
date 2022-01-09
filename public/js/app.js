fetch('http://puzzle.mead.io/puzzle').then(response => {
    response.json().then(data => {
        console.log(data);
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'Message from JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log('error: ', data.error)
                messageOne.textContent = data.error
            } else {
                console.log(`location: ${data.location}, forecast: ${data.forecast}`)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

