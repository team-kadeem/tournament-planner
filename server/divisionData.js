const genders = ['Male', 'Female']
const ageGroups = ['Youth + Senior', 'Jr. Olympic']
const jrWeightGroups = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 101, 106, 110, 114, 119, 125, 132, 138, 145, 154, 165, 176, 177 ]
const femaleSrWeightGroups = [112, 119, 125, 132, 141, 152, 165, 178, 179]
const maleSrWeightGroups = [114, 123, 132, 141, 152, 165, 178, 201, 202]

module.exports = {}

const generateDivisions = () => {
    let divisionObjects = []

    for (let i = 0; i < genders.length; i++) {
        for (let k = 0; k < jrWeightGroups.length; k++) {
            let divisionObject = {}
            divisionObject['title'] = `${genders[i]} Jr. Olympic  ${jrWeightGroups[k]} Group`
            divisionObject['age_group'] = 'Jr. Olympic'
            divisionObject['weight_group'] = jrWeightGroups[k]
            divisionObject['gender'] = genders[i]
            divisionObjects.push(divisionObject)
        }
    }
 
    for (let k = 0; k < femaleSrWeightGroups.length; k++) {
        let divisionObject = {}
        divisionObject['title'] = `Female Youth + Senior  ${femaleSrWeightGroups[k]} Group`
        divisionObject['age_group'] = 'Youth + Senior'
        divisionObject['weight_group'] = femaleSrWeightGroups[k]
        divisionObject['gender'] = 'Female'
        divisionObjects.push(divisionObject)
    }
    
    for (let k = 0; k < maleSrWeightGroups.length; k++) {
        let divisionObject = {}
        divisionObject['title'] = `Male Youth + Senior  ${maleSrWeightGroups[k]} Group`
        divisionObject['age_group'] = 'Youth + Senior'
        divisionObject['weight_group'] = maleSrWeightGroups[k]
        divisionObject['gender'] = 'Male'
        divisionObjects.push(divisionObject)
    }

    return divisionObjects
}

module.exports.generateDivisions = generateDivisions
