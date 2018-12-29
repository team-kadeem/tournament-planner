const express = require('express')

const app = express()

app.post('/register', (req, res) => {
    console.log('registering fighter')
    console.log(req.body)
})
app.listen(8000, () => console.log('App running on port 8000'))