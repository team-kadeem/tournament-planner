const request = require('request')

request.post('http://localhost:3000/register', {form:{
    firstName:''
}})


for (let i = 0; i < 50; i++) {
    let month = Math.floor(Math.random() * 12 + 1)
    let date = Math.floor(Math.random() * 30 + 1)
    let year = Math.floor(Math.random() * 100 + 1910)
    let gender
    if (i % 2 === 0)
        gender = 'Male'
    else
        gender = 'Female'
        
    request.post('http://localhost:3000/register', {form:{
        firstName:`test ${i}`,
        lastName:`test ${i}`,
        boxerEmail:`test ${i}`,
        zipCode: `test ${i}`,
        phoneNumber: `test ${i}`,
        dateOfBirth: `${month}/${date}/${year}`,
        usaBoxingId: `testID${i}`,
        wins: Math.floor(Math.random() * 20),
        losses: Math.floor(Math.random() * 20),
        boxingClubAffiliation:'Test club',
        coachFirstName: 'test coach first ${i}',
        coachLastName: 'test coach last ${i}',
        coachUSABoxingId: `coachTestID${i}`,
        coachPhoneNumber:`test coach phone ${i}`,
        coachEmail:`test coach email ${i}`,
        gender:gender,
        weight: Math.floor((Math.random() * 100) + 100),
        tournamentId:1
    }}, function(err, httpResponse, body){ 
        if (err) {
            console.log(`ERR ${err}`)
        } else {
            console.log(body)
        }
    })
    
}