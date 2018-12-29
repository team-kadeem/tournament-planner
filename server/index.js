const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())


app.post('/register', (req, res) => {
    console.log('registering fighter')
    console.log(req.body)
})
app.listen(8000, () => console.log('App running on port 8000'))