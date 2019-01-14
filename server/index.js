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


app.post('/tournaments', (req, res) => {
    console.log('getting tournaments')
    if (req.body.key === 'admin') {
      console.log('Admin')
      const rowQuery = 'select * from public.tournaments'
        client.query(rowQuery, (err, dbRes) => {
            if (err) {
                console.log(`error retrieving all rows ${err}`)
                return res.send('')
            } else {
                return res.send(dbRes.rows)
            }
        })
    }

    else if (req.body.key === 'new') {
        const values = [req.body.title, req.body.count, '{}', req.body.closeDate]
        const insertQuery = 'INSERT INTO public.tournaments VALUES($1, $2, $3, $4)'
        client.query(insertQuery, values, (err, dbRes) => {
            if (err) {
                console.log(`Error inserting new tournament as admin ${err}`)
            } else {
                console.log('Successful insertion of Query ' + dbRes)
            }
        })
    }

    else {
        const query = `Select * from public.tournaments where close_date > NOW()`
        client.query(query, (err, dbRes) => {
            if (err) {
                console.log('error getting open tournaments ' + err)
                return res.send('')
            } else {
                res.send(dbRes['rows'])
            }
        })
    }
})

app.post('/generate', (req, res) => {

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
        'agegroup',
        'winpercentage'
    ]
    const insert = `INSERT INTO public.fighter(${tableColumns}) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`
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

    values.push(parseFloat(req.body.wins) / (parseFloat(req.body.wins) + parseFloat(req.body.losses)))

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