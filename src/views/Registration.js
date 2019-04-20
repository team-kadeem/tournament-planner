import React from 'react'
import UserType from '../components/Registration/UserType'
import SearchUser from '../components/Registration/SearchUser'
import RegistrationForm from '../components/Registration/RegistrationForm'


export default class Registration extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            formStatus:null,
            fighterNotFound:false,
            userType:'',
            dataLoaded:null,
            invalidSubmission:false,
            userType:'',
            fields:{
                firstName:'',
                lastName:'',
                boxerEmail:'',
                zipCode:'',
                phoneNumber:'',
                dateOfBirth:'',
                usaBoxingId:'',
                wins:'',
                losses:'',
                boxingClubAffiliation:'',
                coachFirstName:'',
                coachLastName:'',
                coachUSABoxingId:'',
                coachPhoneNumber:'',
                coachEmail:'',
                gender:'',
                weight:'',
                rules:'false',
                injury:'false',
                injuryWarning:'false',
                waiver:'false',
                tournamentId:this.props.match.params.tournamentId,
            },
            errors:{
                firstName:true,
                lastName:true,
                boxerEmail:true,
                zipCode:true,
                phoneNumber:true,
                dateOfBirth:true,
                usaBoxingId:true,
                wins:true,
                losses:true,
                boxingClubAffiliation:true,
                coachFirstName:true,
                coachLastName:true,
                coachUSABoxingId:true,
                coachPhoneNumber:true,
                coachEmail:true,
                gender:true,
                weight:true,
                rules:true,
                injury:true,
                injuryWarning:true,
                waiver:true
            }
        }
    }

    updateUserType = (evt) => {
        const userType = evt.target.name
        let state = {...this.state}
        state['userType'] = userType
        this.setState(state)
    }
    
    updateTextInputField = (evt, errorPresent) => {
        let fields = Object.assign({}, this.state.fields)
        let errors = Object.assign({}, this.state.errors)
        fields[evt.target.name] = evt.target.value
        errors[evt.target.name] = errorPresent
        this.setState({...this.state, fields:fields, errors:errors})
    }

    updateCheckboxField = (evt) => {
        let fields = Object.assign({}, this.state.fields)
        let errors = Object.assign({}, this.state.errors)
        fields[evt.target.name] = evt.target.value
        errors[evt.target.name] = false
        this.setState({...this.state, fields:fields, errors:errors})
    }

    updateRadioButtons = (evt, errorPresent) => {
        let fields = Object.assign({}, this.state.fields)
        let errors = Object.assign({}, this.state.errors)
        fields[evt.target.name] = evt.target.value
        if (evt.target.value === 'true') {
            errors[evt.target.name] = false
            this.setState({...this.state, fields:fields, errors:errors })
        } else {
            errors[evt.target.name] = true
            this.setState({...this.state, fields:fields, errors:errors})
        }
    }

    searchUser = (evt) => {
        evt.preventDefault()
        const params = {
            method:'POST',
            headers:{
                "content-type":"text/plain"
            },
            body:JSON.stringify(this.state.fields.usaBoxingId),
        }
        fetch('/search_user', params)
            .then(res => res.json())
            .then(data => this.populateExistingUserForm(data[0]))
            .then(this.setState({...this.state, dataLoaded:true}))
    } 
    
    populateExistingUserForm = (dbResponse) => {
        if (dbResponse == undefined) {
            let stateObject = Object.assign({}, this.state)
            stateObject['fighterNotFound'] = true
            stateObject['userType'] = 'new'
            return this.setState(stateObject)

        } else {
            let stateObject = Object.assign({}, this.state.fields)
            let errors = Object.assign({}, this.state.errors)
            Object.keys(errors).forEach(key => {
                if (key !== 'rules' && 
                    key !== 'injury' && 
                    key !== 'injuryWarning' &&
                    key !== 'waiver') {
                        errors[key] = false
                }
            })
    
            stateObject['firstName'] = dbResponse['first_name']
            stateObject['lastName'] = dbResponse['last_name']
            stateObject['boxerEmail'] = dbResponse['boxer_email']
            stateObject['zipCode'] = dbResponse['zipcode']
            stateObject['phoneNumber'] = dbResponse['phone']
            stateObject['boxingClubAffiliation'] = dbResponse['boxing_club_affiliation']
            stateObject['coachFirstName'] = dbResponse['coach_first_name']
            stateObject['coachLastName'] = dbResponse['coach_last_name']
            stateObject['coachUSABoxingId'] = dbResponse['coach_usa_boxing_id']
            stateObject['coachPhoneNumber'] = dbResponse['coach_phone']
            stateObject['coachEmail'] = dbResponse['coach_email']
            stateObject['weight'] = dbResponse['weight']
    
            //NON EDITABLE
            stateObject['dateOfBirth'] = new Date(dbResponse['date_of_birth']).toDateString().slice(4, )
            stateObject['gender'] = dbResponse['gender']
            stateObject['usaBoxingId'] = dbResponse['usa_boxing_id']
            
            //NOT SURE IF SHOULD BE EDITABLE
            stateObject['wins'] = dbResponse['wins']
            stateObject['losses'] = dbResponse['losses']
    
            return this.setState({...this.state, fields:stateObject, errors: errors}) 
        }
    }

    submitForm = (evt) => {
        evt.preventDefault()
        //make sure no errors
        const errorKeys = Object.keys(this.state.errors)
        const listOfErrors = errorKeys.filter(key => this.state.errors[key])
        if (listOfErrors.length > 0){
            this.setState({...this.state, invalidSubmission:true})
            return
        } 
        else {
            this.setState({...this.state, invalidSubmission:false})
            const params = {
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(this.state.fields) 
            }
            fetch('/register', params)
                .then(res => res.text())
                .then(data => this.setState({...this.state, formStatus:data}))
        }
    }

    updateFighter = (evt) => {
        evt.preventDefault()
        const errorKeys = Object.keys(this.state.errors)
        const listOfErrors = errorKeys.filter(key => this.state.errors[key])
        if (listOfErrors.length > 0){
            this.setState({...this.state, invalidSubmission:true})
            return
        } 
        else {
            this.setState({...this.state, invalidSubmission:false})
            const params = {
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(this.state.fields) 
            }
            fetch('/update_fighter', params)
                .then(res => res.text())
                .then(data => this.setState({...this.state, formStatus:data}))
        }

    }

    render(){

        return(
            <div>
                {this.state.fighterNotFound === true ? 
                <p style={{color:'red'}}>
                    Could not find user with USA Boxing ID: {this.state.fields.usaBoxingId}
                </p> : null
                }
                {
                    this.state.userType === '' ? 
                    <UserType updateButtonHandler={this.updateUserType}/> :
                    this.state.userType === 'new' ? 
                    <RegistrationForm
                        submitHandler={this.submitForm}
                        formStatus={this.state.formStatus}
                        textInputHandler={this.updateTextInputField}
                        checkboxHandler={this.updateCheckboxField}
                        radioHandler={this.updateRadioButtons}
                        errorPresent={this.state.invalidSubmission}
                        firstNameVal={this.state.fields.firstName}
                        firstNameErr={this.state.errors.firstName}
                        lastNameVal={this.state.fields.lastName}
                        lastNameErr={this.state.errors.lastName}
                        boxerEmailVal={this.state.fields.boxerEmail}
                        boxerEmailErr={this.state.errors.boxerEmail}
                        zipCodeVal={this.state.fields.zipCode}
                        zipCodeErr={this.state.errors.zipCode}
                        phoneNumberVal={this.state.fields.phoneNumber}
                        phoneNumberErr={this.state.errors.phoneNumber}
                        dateOfBirthVal={this.state.fields.dateOfBirth}
                        dateOfBirthErr={this.state.errors.dateOfBirth}
                        usaBoxingVal={this.state.fields.usaBoxingId}
                        usaBoxingErr={this.state.errors.usaBoxingId}
                        winsVal={this.state.fields.wins}
                        winsErr={this.state.errors.wins}
                        lossVal={this.state.fields.losses}
                        lossErr={this.state.errors.losses}
                        clubVal={this.state.fields.boxingClubAffiliation}
                        clubErr={this.state.fields.boxingClubAffiliation}
                        coachFirstVal={this.state.fields.coachFirstName}
                        coachFirstErr={this.state.errors.coachFirstName}
                        coachLastVal={this.state.fields.coachLastName}
                        coachLastErr={this.state.errors.coachLastName}
                        coachUSABoxingVal={this.state.fields.coachUSABoxingId}
                        coachUSABoxingErr={this.state.errors.coachUSABoxingId}
                        coachPhoneVal={this.state.fields.coachPhoneNumber}
                        coachPhoneErr={this.state.errors.coachPhoneNumber}
                        coachEmailVal={this.state.fields.coachEmail}
                        coachEmailErr={this.state.errors.coachEmail}
                        weightVal={this.state.fields.weight}
                        weightErr={this.state.errors.weight}
                        genderVal={this.state.fields.gender}
                        genderErr={this.state.errors.gender}
                        rulesVal={this.state.fields.rules}
                        rulesErr={this.state.errors.rules}
                        injuryVal={this.state.fields.injury}
                        injuryErr={this.state.errors.injury}
                        injuryWarningVal={this.state.fields.injuryWarning}
                        injuryWarningErr={this.state.errors.injuryWarning}
                        waiverVal={this.state.fields.waiver}
                        waiverErr={this.state.errors.waiver}
                    /> : this.state.dataLoaded ? 
                    <RegistrationForm
                        disableGender={true}
                        disableId={true}
                        disableBirthday={true}
                        formStatus={this.state.formStatus}
                        submitHandler={this.updateFighter}
                        textInputHandler={this.updateTextInputField}
                        checkboxHandler={this.updateCheckboxField}
                        radioHandler={this.updateRadioButtons}
                        errorPresent={this.state.invalidSubmission}
                        firstNameVal={this.state.fields.firstName}
                        firstNameErr={this.state.errors.firstName}
                        lastNameVal={this.state.fields.lastName}
                        lastNameErr={this.state.errors.lastName}
                        boxerEmailVal={this.state.fields.boxerEmail}
                        boxerEmailErr={this.state.errors.boxerEmail}
                        zipCodeVal={this.state.fields.zipCode}
                        zipCodeErr={this.state.errors.zipCode}
                        phoneNumberVal={this.state.fields.phoneNumber}
                        phoneNumberErr={this.state.errors.phoneNumber}
                        dateOfBirthVal={this.state.fields.dateOfBirth}
                        dateOfBirthErr={this.state.errors.dateOfBirth}
                        usaBoxingVal={this.state.fields.usaBoxingId}
                        usaBoxingErr={this.state.errors.usaBoxingId}
                        winsVal={this.state.fields.wins}
                        winsErr={this.state.errors.wins}
                        lossVal={this.state.fields.losses}
                        lossErr={this.state.errors.losses}
                        clubVal={this.state.fields.boxingClubAffiliation}
                        clubErr={this.state.fields.boxingClubAffiliation}
                        coachFirstVal={this.state.fields.coachFirstName}
                        coachFirstErr={this.state.errors.coachFirstName}
                        coachLastVal={this.state.fields.coachLastName}
                        coachLastErr={this.state.errors.coachLastName}
                        coachUSABoxingVal={this.state.fields.coachUSABoxingId}
                        coachUSABoxingErr={this.state.errors.coachUSABoxingId}
                        coachPhoneVal={this.state.fields.coachPhoneNumber}
                        coachPhoneErr={this.state.errors.coachPhoneNumber}
                        coachEmailVal={this.state.fields.coachEmail}
                        coachEmailErr={this.state.errors.coachEmail}
                        weightVal={this.state.fields.weight}
                        weightErr={this.state.errors.weight}
                        genderVal={this.state.fields.gender}
                        genderErr={this.state.errors.gender}
                        rulesVal={this.state.fields.rules}
                        rulesErr={this.state.errors.rules}
                        injuryVal={this.state.fields.injury}
                        injuryErr={this.state.errors.injury}
                        injuryWarningVal={this.state.fields.injuryWarning}
                        injuryWarningErr={this.state.errors.injuryWarning}
                        waiverVal={this.state.fields.waiver}
                        waiverErr={this.state.errors.waiver}
                    /> :
                    <SearchUser
                        updateHandler={this.updateTextInputField} 
                        submissionHandler={this.searchUser}
                        dataLoaded={this.state.dataLoaded}
                    />
                }
            </div>
        )
    }
} 
