const express = require('express')
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg') 
const { makeBrackets } = require('./makeBrackets')
const path = require('path')
const SquareConnect = require('square-connect')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const cookieEncrypter = require('cookie-encrypter')
const uuid = require('uuidv4')

let config;
if (process.env.PRODUCTION) {
    console.log('production settings')
    config = require('./configs/prod')
} else {
    console.log('local settings')
    config = require('./configs/local')
}

const cookieParams = {
    httpOnly:true,
    signed:true,
    maxAge:(1000 * 60 * 60 * 24 * 7)
}

/*
    EXPRESS
*/
const app = express()
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(express.static(path.join(__dirname, "../build")))
app.use(cookieParser(process.env.sessionCookieKey))
app.use(cookieEncrypter(process.env.sessionCookieKey))


/*
    POSTGRES
*/
const client = new Pool(config.pg)
try {
    client.connect()
} catch (error) {
    console.log(`Error connecting to postgres ${error}`)
}

/*
    SQUARE
*/

const defaultClient = SquareConnect.ApiClient.instance
const oauth2 = defaultClient.authentications['oauth2']
oauth2.accessToken = process.env.squareAccessToken

const lineItems = []

const cost = new SquareConnect.Money()
cost.amount = 100
cost.currency = 'USD'
const item = new SquareConnect.OrderLineItem()
item.quantity = '1'
item.base_price_money = cost
item.name = 'Tournament Spot'
lineItems.push(item)


const tournamentSpot = new SquareConnect.Order()
tournamentSpot.location_id = process.env.squareLocationId
tournamentSpot.line_items = lineItems

const orderRequest = new SquareConnect.CreateOrderRequest()
orderRequest.order = tournamentSpot

const checkoutRequest = new SquareConnect.CreateCheckoutRequest()
//checkoutRequest.idempotency_key = uuid()
checkoutRequest.order = orderRequest
checkoutRequest.redirect_url = 'http://localhost:3000/success' //Handle in Production


const squareApi = new SquareConnect.CheckoutApi() //CHECKOUT



getWeightClass = (gender, agegroup, weight, usaBoxingId, tournamentId, checkoutId, transactionId) => {
    console.log(`get weight input ${gender} ${agegroup} ${weight}`)
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

    } else if (gender === 'Female' && agegroup === 'Youth + Senior') {
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
    determineDivision(gender, agegroup, weightClass, usaBoxingId, tournamentId, checkoutId, transactionId)
    return weightClass
}

determineDivision = (gender, agegroup, weightClass, usaBoxingId, tournamentId, checkoutId, transactionId) => {
    gender = gender[0].toUpperCase() + gender.substring(1,)
    const divisionTitle = `${gender} ${agegroup}  ${weightClass} Group`
    const query = `SELECT * FROM public.division where title = '${divisionTitle}'`
    client.query(query)
        .then(dbRes => registerFighter(usaBoxingId, tournamentId, dbRes.rows[0].id, checkoutId, transactionId))
        .catch(e => `Err getting division for new registrant ${e}`)
}

registerFighter = (usaBoxingId, tournamentId, divisionId, checkoutId, transactionId) => {
    const values = [usaBoxingId, tournamentId, divisionId, checkoutId, transactionId]
    const query = `INSERT INTO public.fights_in(fighter_usa_boxing_id, tournament_id, division_id, checkout_id, transaction_id) VALUES($1, $2, $3, $4, $5)`

    client.query(query, values, (err, dbRes) => {
        if (err) console.log(err)
        else 
            console.log(`Added ${usaBoxingId} to tournament number ${tournamentId}`)
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

organizeByDivisions = (rows) => {
    let currentDivision = rows[0].division_id
    let container = []
    let fightersInDivision = []
    rows.forEach(row => {
        if (row.division_id !== currentDivision){
            currentDivision = row.division_id
            container.push(fightersInDivision)
            fightersInDivision = []
        }
        fightersInDivision.push(row)  
    })
    return container

}

makeBracketsWrapper = (organizedFighters, tournamentId) => {
    organizedFighters.forEach(fightersByDivision => {
        if (fightersByDivision.length === 1) {
            console.log('SkIPPING DIVISION WITH ONLY ONE FIGHTER')
        } else {
            insertBrackets(makeBrackets(fightersByDivision.length, fightersByDivision), tournamentId)
        }
    })
}

insertBrackets = (brackets, tournamentId) => {
    let bracketColumns = [
        'fighter1',
        'fighter2',
        'winner',
        'loser',
        'node_number',
        'description',
        'root',
        'tournament_id',
        'round_number',
        'division',
        'left_child',
        'right_child'
    ]

    let division
    brackets.forEach(bracket => {
        let fighter1, fighter2
        let leftChild, rightChild

        if (bracket.roundNumber === 1) {
            fighter1 = `${bracket.fighter1.first_name || 'Bye'} ${bracket.fighter1.last_name || ''}`
            fighter2 = `${bracket.fighter2.first_name || 'Bye'} ${bracket.fighter2.last_name || ''}`
            leftChild = null
            rightChild = null
            division = `${bracket.fighter1.division_id || bracket.fighter2.division_id}`
        } else {
            fighter1 = bracket.fighter1
            fighter2 = bracket.fighter2
            leftChild = bracket.leftChild.nodeNumber,
            rightChild = bracket.rightChild.nodeNumber
        }
        const query = `insert into public.brackets(${bracketColumns}) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
        const values = [
            fighter1,
            fighter2,
            bracket.winner,
            bracket.loser,
            bracket.nodeNumber,
            bracket.description,
            bracket.root,
            tournamentId,
            bracket.roundNumber,
            parseInt(division),
            leftChild,
            rightChild
        ]

        client.query(query, values, (err, dbRes) => {
            if (err) {
                console.log('Error inserting bracket ' + err)
            } else {
                const updateTournament = `Update public.tournament set bracket_made = ($1) where id = ${tournamentId}`
                const values = [true]
                client.query(updateTournament, values, (err, dbRes) => {
                    if (err) {
                        console.log('ERR CHANGING BRACKET MADE FROM FALSE TO TRUE ' + err)
                    } else {
                        console.log('UPDATED BRACKET')
            }
        })
    }
    })
})}

/* -------------------------------------------------------------------------------------
 *
 *   Routes
 *
 * --------------------------------------------------------------------------------------
*/

app.get('/ping', (req, res) => {
    return res.send('PONG')
})


app.get('/home', (req, res) => {
    const query = `Select * from public.tournament where completed = false`
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

app.get('validate', (req, res) => {
    console.log(req.body)
})


app.post('/tournaments', (req, res) => {
    if (req.body.key === 'admin') {
      const rowQuery = `SELECT tournament.title,
                                tournament.id,
                                tournament.event_datetime,
                                tournament.registration_close,
                                tournament.location,
                                tournament.bracket_made,
                                fights_in.fighter_usa_boxing_id,
                                fighter.first_name,
                                fighter.last_name,
                                fighter.usa_boxing_id
                        from
                                public.tournament
                        inner join fights_in on tournament.id = fights_in.tournament_id
                        inner join fighter on fights_in.fighter_usa_boxing_id = fighter.usa_boxing_id`
        client.query(rowQuery)
            .then(dbRes => res.send(dbRes.rows))
            .catch(e => console.log(`Error getting all tournaments ${e}`))
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


app.post('/register', (req, res) => {
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
        'experience',
        'checkout_id',
        'transaction_id'
    ]
    let experience
    const dateOfBirth = new Date(req.body.dateOfBirth)

    if (!req.body.experience) {
        if (req.body.wins >= 10) 
            experience = 'OPEN'
        else
            experience = 'NOVICE'
    } else {
        experience = req.body.experience
    }

    checkoutRequest.idempotency_key = uuid()

    squareApi.createCheckout(process.env.squareLocationId, checkoutRequest)
    .then(data => {
        console.log(data)
        
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
            //Age group here
            experience,
            data['checkout']['id'],
            data['checkout']['order']['id'],
        ]
        const insert = `INSERT INTO public.fighter(${tableColumns}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`

        const jrOlympicDate = new Date('01/01/2002')
        if (dateOfBirth.getFullYear() >= jrOlympicDate.getFullYear())
            values.splice(17, 0, 'Jr. Olympic')
        else
            values.splice(17, 0, 'Youth + Senior')
        
        client.query(insert, values)
            .then(dbRes => {
                console.log(`Successful registration for ${req.body.firstName} ${req.body.lastName}: ${req.body.usaBoxingId}`)
                getWeightClass(
                    req.body.gender, 
                    values[17], 
                    parseInt(req.body.weight), 
                    req.body.usaBoxingId, 
                    req.body.tournamentId,
                    data['checkout']['id'],
                    data['checkout']['order']['id']
                )
                return res.send({
                    status:'Registered Successfully',
                    checkoutUrl:data['checkout']['checkout_page_url']
                })
            })
            .catch(e => console.log(`Error registering ${e}`))
    })
    .catch(e => console.log(e))

})

app.post('/payment', (req, res) => {
    //INSERT THE REGISTRANT INTO THE FIGHTER TABLE WITH A CHECKOUT ID & TRANSACTION ID
    //INSERT THE REGISTRANT INTO THE FIGHTSIN TABLE WITH THEIR CHECKOUT ID AND A COLUMN PAID = FALSE
    //WHEN USER IS REDIRECTED TO THE SUCCESS PAGE, PARSE THE CHECKOUT ID & TRANSACTION ID OUT OF URL, QUERY FOR IT AND UPDATE PAID TO TRUE
    //TRANSACTION ID IS HIDDEN SO THE ENDPOINT CAN'T BE REVERSE ENGINEERED
    // squareApi.createCheckout(process.env.squareLocationId, checkoutRequest)
    //     .then(data => {
    //         console.log(data)
    //         res.send(data['checkout']['checkout_page_url'])
    //     })
    //     .catch(e => console.log(e))
    console.log(req.body)
    console.log('payment route')
    const values = [true]
    if (req.body.checkoutId && req.body.transactionId) {
        const query = `update public.fights_in set paid = ($1) where checkout_id = '${req.body.checkoutId}' and transaction_id = '${req.body.transactionId}'`
        client.query(query, values)
            .then(dbRes => console.log(dbRes))
            .then(() => res.send ('Redirect'))
            .catch(e => console.log(e))
    }

})


app.post('/search_user', (req, res) => {
    console.log('searching for user')
    let searchID = req.body.slice(1, req.body.length - 1)
    const searchQuery = `Select * from public.fighter where usa_boxing_id = '${searchID}'`
    client.query(searchQuery)
        .then(dbRes => res.send(dbRes.rows))
        .catch(e => console.log(`error searching user ${e}`))
    })

app.post('/admin', (req, res) => {
    if (req.signedCookies['session'] === process.env.sessionCookie)
        return res.send('Valid')
    else 
        return res.send('Invalid')
})

app.post('/login', (req, res) => {
    const query = `Select * from front_end.credentials`
    client.query(query)
        .then(dbRes => bcrypt.compare(req.body.input, dbRes.rows[0]['password']))
        .then(result => {
            if (result) {
                res.cookie('session', process.env.sessionCookie, cookieParams )
                res.send('Good')
            } else
                res.send('Bad')
        })
        .catch(e => console.log(`error authenticating admin ${e}`))
})

app.post('/update_fighter', (req, res) => {
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


app.post('/generate', (req, res) => {
    const query = `Select tournament_id, fighter_usa_boxing_id, division_id, first_name, last_name
                    from public.fights_in inner join public.fighter on
                    public.fights_in.fighter_usa_boxing_id = public.fighter.usa_boxing_id
                    where tournament_id = ${req.body.tournamentId} order by division_id`
    client.query(query)
        .then(dbRes => {
            const organizedByDvisions = organizeByDivisions(dbRes.rows)
            makeBracketsWrapper(organizedByDvisions, req.body.tournamentId)  
        })
        .catch(e => console.log(`Error generating brackets ${e}`))
    })

app.post('/brackets', (req, res) => {
    const query = `select brackets.fighter1,
                    brackets.fighter2,
                    brackets.winner,
                    brackets.loser,
                    brackets.node_number,
                    brackets.description,
                    brackets.root,
                    brackets.division,
                    brackets.tournament_id,
                    brackets.round_number,
                    brackets.left_child,
                    brackets.right_child,
                    division.title as division_title
                from public.brackets
                inner join division on brackets.division = division.id where tournament_id = ${req.body.tournamentId}
                order by division, round_number, node_number asc`
    client.query(query)
        .then(dbRes => res.send(dbRes.rows))
        .catch(e => console.log(`Error getting brackets for tree ${e}`)) 
})


app.post('/update_bracket', (req, res) => {
    let fighterNumber;
    req.body.nodeNum % 2 === 0 ? fighterNumber = 'fighter2' : fighterNumber = 'fighter1'

    const values = [req.body.winner, req.body.loser]
    const updateOldBracket = `UPDATE public.brackets SET winner = ($1), loser = ($2) WHERE
                              tournament_id = ${req.body.tournamentNum} AND
                              division = ${req.body.division} AND
                              round_number = ${req.body.roundNumber} AND
                              node_number = ${req.body.nodeNum}
                              `

    const updateNewBracket = `UPDATE public.brackets SET ${fighterNumber} = '${req.body.winner}' WHERE 
                              tournament_id = ${req.body.tournamentNum} AND
                              division = ${req.body.division} AND
                              round_number = ${req.body.nextRound} AND
                              ( left_child = ${req.body.nodeNum} OR right_child = ${req.body.nodeNum} )
                             `
    client.query(updateOldBracket, values, (err, dbRes) => {
        if (err) {
            console.log('Error updating winner: ' + err)
        } else {
            client.query(updateNewBracket, (err, dbRes) => {
                if (err) {
                    console.log('Error adding winner to next round ' + err)
                } else {
                    const returnUpdatedBracketsQuery = `select brackets.fighter1,
                            brackets.fighter2,
                            brackets.winner,
                            brackets.loser,
                            brackets.node_number,
                            brackets.description,
                            brackets.root,
                            brackets.division,
                            brackets.tournament_id,
                            brackets.round_number,
                            brackets.left_child,
                            brackets.right_child,
                            division.title as division_title
                        from public.brackets
                        inner join division on brackets.division = division.id where tournament_id = ${req.body.tournamentNum}
                        order by division, round_number, node_number asc`

                    client.query(returnUpdatedBracketsQuery, (err, dbRes) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            return res.send(dbRes.rows)
                        }
                    } )
                }
            })
        }
    })
})

app.post('/tournament_name', (req, res) => {
    const query = `Select * from public.tournament where id = ${req.body.tournamentId}`
    client.query(query)
        .then(dbRes => res.send(dbRes.rows[0].title))
        .catch(e => console.log(`Error fetching tournament name ${e}`))
})

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, '../build/index.html'))
})



if (require.main === module) {
    const client = new Pool(config.pgLocal)
    app.listen(8000, () => {
        console.log('Tournament running on port 8000')
    })
} else {
    exports.app = app
    exports.pgClient = new Client(config.pgLocal)
}
