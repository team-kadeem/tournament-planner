const express = require('express')
const bodyParser = require('body-parser')
const { Client } = require('pg')
const config = require('./configs/local')


const app = express()
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

//POSTGRES
const client = new Client({
    user:'local',
    host:'localhost',
    database:'boxingLocal',
    password:'local',
    port:'5432'
})
client.connect()
// client.query('SELECT current_database()', (err, res) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(res)
//     }
// })


app.post('/tournaments', (Req, res) => {
    console.log('getting tournaments')
    const currentDate = new Date()
    const query = `Select * from public.tournaments where close_date > NOW()`
    client.query(query, (err, rows) => {
        if (err) {
            console.log('error getting open tournaments')
        } else {
            console.log('successful retrieve rows')
            console.log(rows['rows'])
            res.send(rows['rows'])
        }
    })
})


app.post('/register', (req, res) => {
    console.log('registering fighter')
    console.log(req.body)
    const tableColumns = [
        'firstname', 
        'lastname', 
        'boxeremail', 
        'zipcode', 
        'phonenumber', 
        'dateofbirth', 
        'usaboxingid', 
        'wins', 
        'losses', 
        'boxingclubaffiliation', 
        'coachfirstname', 
        'coachlastname', 
        'coachusaboxingid', 
        'coachphonenumber', 
        'coachemail',  
        'gender', 
        'weight',
        'agegroup'
    ]
    const insert = `INSERT INTO public.fighter(${tableColumns}) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`
    const dateOfBirth = new Date(req.body.dateOfBirth)
    const jrOlympicDate = new Date('01/01/2002')
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.boxerEmail,
        req.body.zipCode,
        req.body.phoneNumber,
        dateOfBirth,
        req.body.usaBoxingId,
        parseInt(req.body.wins),
        parseInt(req.body.losses),
        req.body.boxingClubAffiliation,
        req.body.coachFirstName,
        req.body.coachLastName,
        req.body.coachUSABoxingId,
        req.body.coachPhoneNumber,
        req.body.coachEmail,
        req.body.gender,
        parseInt(req.body.weight)
    ]
    if (dateOfBirth.getFullYear() >= jrOlympicDate.getFullYear) {
        console.log(`fighter date of birth is ${dateOfBirth} Younger than 01/01/2002`)
        values.push('Jr. Olympic')
    } else {
        console.log(`fighter date of birth is ${dateOfBirth} Older than 01/01/2002`)
        values.push('Youth + Senior')
    }

    const tournament = req.body['tournament']
    const fullName = `${req.body.firstName} ${req.body.lastName}`
    console.log(tournament)
    const tournamentInsertQuery = `UPDATE public.tournaments SET registrants = array_cat(registrants, '{${fullName}}') where id=${tournament}`
    client.query(insert, values, (err, res) => {
        if (err) {
            console.log(`Error: ${err}`)
        } else {
            console.log('successful insert query ' + res)
            client.query(tournamentInsertQuery, (err, res) => {
                if (err) {
                    console.log('Error inserting new user into tournament')
                    console.log(err)
                } else {
                    console.log(res)
                    console.log('Successfully inserted new user into other tournament')
                }
            })
        }
    })

})
app.listen(8000, () => console.log('App running on port 8000'))