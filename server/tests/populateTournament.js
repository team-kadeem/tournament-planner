const Request = require('request')

const firstNames = [
    'Anthony',
    'Tyson',
    'Deontay',
    'Errol',
    'Keith',
    'Roy',
    'Evander',
    'Mike',
    'Shannon',
    'Shawn',
    'Adrien',
    'Floyd',
    'Cassius',
    'Muhammad',
    'George'
]

const lastNames = [
    'Joshua',
    'Fury',
    'Wilder',
    'Spence',
    'Thurman',
    'Jones',
    'Holyfield',
    'Tyson',
    'Briggs',
    'Porter',
    'Broner',
    'Mayweather',
    'Clay',
    'Ali',
    'Foreman'
]

const emails = [
    'test1@test.com',
    'test2@test.com',
    'test3@test.com',
    'test4@test.com',
    'test5@test.com',
    'test6@test.com',
    'test7@test.com',
    'test8@test.com',
    'test9@test.com',
    'test10@test.com',    
]

const zipCodes = [
    '11236',
    '11207',
    '10003',
    '11217',
    '10013',
    '11235',
    '10025',
    '10037',
    '10017',
    '10004'
]

const phones = [
    '718-233-1990',
    '347-431-0879',
    '646-421-9549',
    '212-999-9998',
    '516-881-1010',
    '221-905-1890',
    '921-334-3434',
    '347-431-0877',
    '347-321-0879',
    '347-431-1179',
]

const dobs = [
    '01/01/1999',
    '02/21/2010',
    '03/22/1990',
    '04/13/2011',
    '05/04/2002',
    '06/09/2003',
    '07/19/2001',
    '08/8/1998',
    '09/1/1980',
    '10/17/1999',

]

const wins = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
]

const losses = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
]

const clubAffiliations = [
    'Church Street Boxing Gym',
    'Mendez Boxing Gym',
    'Work Train Fight',
    'Brotherhood Boxing Club',
    'Finchley Boxing Club',
    'ABC Boxing Club',
    'Paerdegat Boxing Club',
    'DEF Boxing Club',
    'GHI Boxing Club',
    'JKL Boxing Club'
]

weight = [
    77, 85, 120, 130, 140, 150, 160, 170, 180, 198, 202,
]

gender = [
    'Male',
    'Female'
]

randomValue = (inputArray) => {

    return inputArray[Math.floor(Math.random() * inputArray.length)]
}


for(i = 0; i < 10; i++){
    const submission = {
        firstName: randomValue(firstNames),
        lastName: randomValue(lastNames),
        boxerEmail: randomValue(emails),
        zipCode: randomValue(zipCodes),
        phoneNumber: randomValue(phones),
        dateOfBirth: randomValue(dobs),
        usaBoxingId: "",
        wins: randomValue(wins),
        losses: randomValue(losses),
        boxingClubAffiliation: randomValue(clubAffiliations),
        coachFirstName: "",
        coachLastName: "",
        coachUSABoxingId: "",
        coachPhoneNumber:"",
        coachEmail: "",
        gender: randomValue(gender),
        weight: randomValue(weight),
        rules: true,
        injury: true,
        injuryWarning: true,
        waiver: true,
        tournamentId: 4
    }
    Request.post('http://localhost:3000/register', {form:submission})
}

