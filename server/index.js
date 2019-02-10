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



getWeightClass = (gender, agegroup, weight) => {
    console.log(gender)
    console.log(agegroup)
    console.log(weight)
    let weightClass
    if (agegroup === 'Jr. Olympic') {
        console.log('wtf')
        switch(true){
            case weight <= 50:
                weightClass = 50
                break
            case weight <= 55:
                weightClass = 55
                break
            case weight <= 60:
                weightClass = 60
                break
            case weight <= 65:
                weightClass = 65
                break
            case weight <= 70:
                weightClass = 70
                break
            case weight <= 75:
                weightClass = 75
                break
            case weight <= 80:
                weightClass = 80
                break
            case weight <= 85:
                weightClass = 85
                break
            case weight <= 90:
                weightClass = 90
                break
            case weight <= 95:
                weightClass = 95
                break
            case weight <= 101:
                weightClass = 101
                break
            case weight <= 106:
                weightClass = 106
                break
            case weight <= 110:
                weightClass = 110
                break
            case weight <= 114:
                weightClass = 114
                break
            case weight <= 119:
                weightClass = 119
                break
            case weight <= 125:
                weightClass = 125
                break
            case weight <= 132:
                weightClass = 132
                break
            case weight <= 138:
                weightClass = 138
                break
            case weight <= 145:
                weightClass = 145
                break
            case weight <= 154:
                weightClass = 154
                break
            case weight <= 165:
                weightClass = 165
                break
            case weight <= 176:
                weightClass = 176
                break
            case weight > 176:
                weightClass = 177
                break
        }

    } else if (gender === 'female' && agegroup === 'Youth + Senior') {
        switch(true){
            case weight <= 112:
                weightClass = 112
                break
            case weight <= 119:
                weightClass = 119
                break
            case weight <= 125:
                weightClass = 125
                break
            case weight <= 132:
                weightClass = 132
                break
            case weight <= 141:
                weightClass = 141
                break
            case weight <= 152:
                weightClass = 152
                break
            case weight <= 165:
                weightClass = 165
                break
            case weight <= 178:
                weightClass = 178
                break
            case weight > 178:
                weightClass = 179
                break 
        }
    }
    else {
        switch(true){
            case weight <= 114:
                weightClass = 114
                break
            case weight <= 123:
                weightClass = 123
                break
            case weight <= 132:
                weightClass = 132
                break
            case weight <= 141:
                weightClass = 141
                break
            case weight <= 152:
                weightClass = 152
                break
            case weight <= 165:
                weightClass = 165
                break
            case weight <= 178:
                weightClass = 178
                break
            case weight <= 201:
                weightClass = 201
                break
            case weight > 201:
                weightClass = 202
                break 
        }

    }
    return weightClass
}
app.post('/tournaments', (req, res) => {
//ADMIN VIEW ALL TOURNAMENTS
    console.log('getting tournaments')
    if (req.body.key === 'admin') {
      console.log('ADMIN GETTING TOURNAMENTS')
      const rowQuery = `SELECT tournaments.title,
                               tournaments.id,
                               tournaments.close_date,
                               fighterid,
                               firstname,
                               lastname
                        FROM public.tournaments
                        LEFT JOIN fighter ON fighter.tournamentid = tournaments.id`
        client.query(rowQuery, (err, dbRes) => {
            if (err) {
                console.log(`error retrieving all rows ${err}`)
                return res.send('')
            } else {
                console.log(dbRes.rows)
                return res.send(dbRes.rows)
            }
        })
    }
//ADMIN CREATE NEW TOURNAMENT
    else if (req.body.key === 'new') {
        console.log(req.body)
        const values = [req.body.title, req.body.eventDate, req.body.closeDate, req.body.address]
        const insertQuery = 'INSERT INTO public.tournament(title, date, registration_close, address) VALUES($1, $2, $3, $4)'
        client.query(insertQuery, values, (err, dbRes) => {
            if (err) {
                console.log(`Error inserting new tournament as admin ${err}`)
            } else {
                console.log('Successful insertion of Query ' + dbRes)
            }
        })
    }
//FIGHTER VIEW OPEN TOURNAMENTS
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
    const query = `select * from public.fighter where tournamentid = ${req.body.tournamentid} order by (gender, agegroup, weight_class)`
    client.query(query, (err, dbRes) => {
        if (err) {
            console.log('error with query ' + err)
        } else {
            console.log('successful query')
            // console.log(dbRes.rows)
            dbRes.rows.forEach(row => {
                console.log(row + '\n\n')
            })
        }
    })
    return res.send('hi')
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
        'winpercentage',
        'tournamentId',
        'weight_class'
    ]
    const insert = `INSERT INTO public.fighter(${tableColumns}) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`
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
        parseInt(req.body.weight),
        //AGE GROUP HERE
        parseFloat(req.body.wins) / (parseFloat(req.body.wins) + parseFloat(req.body.losses)),
        req.body.tournamentId,
    ]
    if (dateOfBirth.getFullYear() >= jrOlympicDate.getFullYear()) {
        console.log(`fighter date of birth is ${dateOfBirth} Younger than 01/01/2002`)
        values.splice(17, 0, 'Jr. Olympic')
    } else {
        console.log(`fighter date of birth is ${dateOfBirth} Older than 01/01/2002`)
        values.splice(17, 0, 'Youth + Senior')
    }

    console.log(getWeightClass(req.body.gender, values[17], parseInt(req.body.weight)))
    values.push(getWeightClass(req.body.gender, values[17], parseInt(req.body.weight)))


    client.query(insert, values, (err, res) => {
        if (err) {
            console.log(`Error: ${err}`)
        } else {
            console.log('successful insert query ' + res)
        }
    })

})

app.get('/create_brackets', (req, res) => {
    
})

app.listen(8000, () => console.log('App running on port 8000'))