const { Client } = require('pg')
const { generateDivisions } = require('./divisionData')


const client = new Client({
    user:'local',
    host:'localhost',
    database:'boxing_local',
    password:'local',
    port:'5432'
})
client.connect()

prepareDivisionInserts = rows => {

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

        chunks.push('(' + valueClause.join(', ') + ')')
    }
    return {
        text: 'INSERT INTO public.division(title, age_group, weight_group, gender) VALUES ' + chunks.join(', '),
        values: params
    }
    
}
client.query(prepareDivisionInserts(generateDivisions(), (err, response) => {
    if (err) {
        console.log('error creating divisions')
    } else {
        console.log('successful insert')
        console.log(response)
        client.close()
    }
})
)