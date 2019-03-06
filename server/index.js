const express = require('express')
const bodyParser = require('body-parser')
const { Client } = require('pg')
const { generateDivisons } = require('./divisionData')
const config = require('./configs/local')


const app = express()
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use(bodyParser.text())

//POSTGRES
const client = new Client({
    user:'local',
    host:'localhost',
    database:'boxing_local',
    password:'local',
    port:'5432'
})
client.connect()


determineDivision = (gender, agegroup, weight) => {

}
getWeightClass = (gender, agegroup, weight) => {

    let weightClass
    if (agegroup === 'Jr. Olympic') {
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

addFighterToTournament = (usaBoxingId, tournamentId) => {
    const values = [usaBoxingId, tournamentId]
    const query = `INSERT INTO public.fights_in(fighter_usa_boxing_id, tournament_id) VALUES($1, $2)`

    client.query(query, values, (err, dbRes) => {
        if (err) console.log(err)
        else {
            console.log(`Added ${usaBoxingId} to tournament number ${tournamentId}`)
        }
    })
}

checkFighterRegistration = usaBoxingId => {
    const checkQuery = `SELECT fights_in.tournament_id, fighter_usa_boxing_id from public.fighter 
                        inner join fights_in on fights_in.fighter_usa_boxing_id = fighter.usa_boxing_id
                        `
    client.query(checkQuery, (err, dbRes) => {
        if (err) console.log('Error checking fighter ' + err)
        else{
            console.log('check query results:')
            console.log(dbRes)
        }

    })
}

prepareDivisionInserts = (rows, tournamentId) => {

    let params = []
    let chunks = []
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i]
        let valueClause = []
        params.push(row.title)
        valueClause.push('$' + params.length)
        params.push(row.age_group)
        valueClause.push('$' + params.length)
        params.push(row.weight_group)
        valueClause.push('$' + params.length)
        params.push(row.gender)
        valueClause.push('$' + params.length)
        params.push(row.tournament_id)
        valueClause.push('$' + params.length)

        chunks.push('(' + valueClause.join(', ') + ')')
    }
    return {
        text: 'INSERT INTO public.division(title, age_group, weight_group, gender, tournament_id) VALUES ' + chunks.join(', '),
        values: params
    }
    
}

prepareBrackets = (rows) => {
    let current
}

//////////////////
//ROUTES       ///
//////////////////
app.get('/home', (req, res) => {
    const query = `Select * from public.tournament where registration_close > NOW()`
    client.query(query, (err, dbRes) => {
        if (err) {
            console.log('error getting open tournaments ' + err)
            return res.send('')
        } else {
            res.send(dbRes['rows'])
        }
    })
    }
)


app.post('/search_user', (req, res) => {
    console.log('searching for user')
    let searchID = req.body.slice(1, req.body.length - 1)
    const searchQuery = `Select * from public.fighter where usa_boxing_id = '${searchID}'`
    console.log(searchQuery)
    client.query(searchQuery, (err, dbRes) => {
        if (err) console.log(err)
        else{
            console.log(dbRes.rows)
            return res.send(dbRes.rows)
        }
    })
})


app.post('/tournaments', (req, res) => {
//ADMIN VIEW ALL TOURNAMENTS
    console.log('getting tournaments')
    if (req.body.key === 'admin') {
      console.log('ADMIN GETTING TOURNAMENTS')
      const rowQuery = `SELECT tournament.title,
                                tournament.id,
                                tournament.event_datetime,
                                tournament.registration_close,
                                tournament.location,
                                fights_in.fighter_usa_boxing_id,
                                fighter.first_name,
                                fighter.last_name,
                                fighter.usa_boxing_id
                        from
                                public.tournament
                        inner join fights_in on tournament.id = fights_in.tournament_id
                        inner join fighter on fights_in.fighter_usa_boxing_id = fighter.usa_boxing_id`
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
    else {
        const values = [req.body.title, req.body.eventDate, req.body.closeDate, req.body.address]
        const insertQuery = 'INSERT INTO public.tournament(title, event_datetime, registration_close, location) VALUES($1, $2, $3, $4) returning *'



        client.query(insertQuery, values, (err, dbRes) => {
            if (err) {
                console.log(`Error inserting new tournament as admin ${err}`)
            } else {
                console.log('Successfully created new tournament ')
            }
        })
    }
})



app.post('/generate', (req, res) => {
    const query = `Select fighter_usa_boxing_id,
        fighter.first_name,
        fighter.last_name,
        fighter.gender,
        fighter.age_group,
        fighter.weight_class
        from public.fights_in
        inner join fighter on fighter_usa_boxing_id = fighter.usa_boxing_id
        and tournament_id = ${req.body.tournamentid}
        order by gender, age_group, weight_class`
    client.query(query, (err, dbRes) => {
        if (err) {
            console.log('error with query ' + err)
        } else {
            console.log('successful query')
            console.log(dbRes.rows)
            // prepareDivisionInserts(generateDivisons(), req.body.tournamentid)
            res.send(dbRes.rows)
        }
    })
    return
})


app.post('/register', (req, res) => {
    let existingFighter = false
    checkFighterRegistration()
    const tableColumns = [
        'first_name', 
        'last_name', 
        'boxer_email', 
        'zipcode', 
        'phone', 
        'date_of_birth', 
        'usa_boxing_id', 
        'wins', 
        'losses', 
        'boxing_club_affiliation', 
        'coach_first_name', 
        'coach_last_name', 
        'coach_usa_boxing_id', 
        'coach_phone', 
        'coach_email',  
        'gender', 
        'weight',
        'age_group',
        'weight_class'
    ]
    const insert = `INSERT INTO public.fighter(${tableColumns}) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`
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


    client.query(insert, values, (err, dbRes) => {
        if (err) {
            console.log(`Error: ${err}`)
        } else {
            console.log('successful insert query ' + dbRes)
            addFighterToTournament(req.body.usaBoxingId, req.body.tournamentId)
            //After successful query
            return res.send('Registered successfully!')

        }
    })

})

app.post('/update_fighter', (req, res) => {
    console.log('update fighter')
    console.log(req.body)
    const updateValues = [
        req.body.firstName,
        req.body.lastName,
        req.body.boxerEmail,
        req.body.zipCode,
        req.body.phoneNumber,
        req.body.wins,
        req.body.losses,
        req.body.boxingClubAffiliation,
        req.body.coachFirstName,
        req.body.coachLastName,
        req.body.coachUSABoxingId,
        req.body.coachPhoneNumber,
        req.body.coachEmail,
        req.body.weight
    ]
    //need to update age group and weight class
    const updateQuery = `update public.fighter set first_name = ($1), 
        last_name = ($2), 
        boxer_email = ($3),
        zipcode = ($4),
        phone = ($5),
        wins = ($6),
        losses = ($7),
        boxing_club_affiliation = ($8),
        coach_first_name = ($9),
        coach_last_name = ($10),
        coach_usa_boxing_id = ($11),
        coach_phone = ($12),
        coach_email = ($13),
        weight = ($14)
        where usa_boxing_id = '${req.body.usaBoxingId}'`


    client.query(updateQuery, updateValues, (err, dbRes) => {
        if (err) console.log(err)
        else {
            console.log('successful update')
            const values = [req.body.tournamentId, req.body.usaBoxingId]
            const insertQuery = `INSERT INTO public.fights_in(tournament_id, fighter_usa_boxing_id) VALUES($1, $2)`
            client.query(insertQuery, values, (err, dbUpdateRes) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Added to new fighter after update')
                }
            })
            return res.send('Updated and Registered!')
        }
    })
})

app.get('/create_brackets', (req, res) => {
    
})





if (require.main === module) {
    app.listen(8000, () => console.log('Tournament running on port 8000'))
} else {
    exports.app = app
    exports.pg = client
}
