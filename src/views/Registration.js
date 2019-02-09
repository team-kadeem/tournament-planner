import React from 'react'
import Field from '../components/Registration/Field'
import { FaAsterisk } from 'react-icons/fa'
import isEmail from 'validator/lib/isEmail'
import isPostalCode from 'validator/lib/isPostalCode';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isBefore from 'validator/lib/isBefore'
import isInt from 'validator/lib/isInt'
import { match } from 'minimatch';

export default class Registration extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            invalidSubmission:false,
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
            console.log('form submitted')
            const params = {
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(this.state.fields) 
            }
            console.log(params['body'])
            fetch('/register', params)
        }
    }

    render(){
        const submitButton = {
            padding:'10px 20px',
            border:'1px solid #007bff',
            color:'white',
            backgroundColor:'#007bff',
            fontSize:'18px',
            borderRadius:'4px',
            marginLeft:'10px',
            outline:'0'
        }

        const radioButtonTextStyle = {
            lineHeight:'20px'
        }

        const radioTextMargins = {
            margin:'0px 250px 40px 20px'
        }

        const radioWarnings = {
            display:'inline-block',
            color:'red',
            marginLeft:'10px'
        }

        return(
            <div>
                <form onSubmit={this.submitForm}>
                    <Field
                        name="firstName"
                        type="text"
                        value={this.state.fields.firstName}
                        label="First Name"
                        onChange={this.updateTextInputField}
                        required={true}
                        updateErrors={this.updateErrors}
                        errorPresent={this.state.errors.firstName && this.state.invalidSubmission}
                        validation={ val => val.length !== 0}
                    />
                    <Field
                        name="lastName"
                        type="text"
                        value={this.state.fields.lastName}
                        label="Last Name"
                        onChange={this.updateTextInputField}
                        required={true}
                        updateErrors={this.updateErrors}
                        errorPresent={this.state.errors.lastName && this.state.invalidSubmission}
                        validation={val => val.length !== 0}
                    />
                    <Field
                        name='boxerEmail'
                        type="text"
                        value={this.state.fields.boxerEmail}
                        label="Boxer's Email Address"
                        onChange={this.updateTextInputField}
                        required={true}
                        updateErrors={this.updateErrors}
                        errorPresent={this.state.errors.boxerEmail && this.state.invalidSubmission}
                        validation={data => isEmail(data)}
                    />
                    <Field
                        name="zipCode"
                        type="text"
                        value={this.state.fields.zipCode}
                        label="Residence - Zip Code"
                        onChange={this.updateTextInputField}
                        required={true}
                        updateErrors={this.updateErrors}
                        errorPresent={this.state.errors.zipCode && this.state.invalidSubmission}
                        validation={data => isPostalCode(data, 'US')}

                    />
                    <Field
                        name="phoneNumber"
                        type="text"
                        value={this.state.fields.phoneNumber}
                        onChange={this.updateTextInputField}
                        label="Cell/Phone Number"
                        required={true}
                        errorPresent={this.state.errors.phoneNumber && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={data => isMobilePhone(data, 'en-US')}

                    />

                    <Field
                        name="dateOfBirth"
                        type="text"
                        value={this.state.fields.dateOfBirth}
                        onChange={this.updateTextInputField}
                        label="Boxer's Date of Birth (MM/DD/YYYY)"
                        required={true}
                        errorPresent={this.state.errors.dateOfBirth && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={val => isBefore(val)}

                    />

                    <Field
                        name="usaBoxingId"
                        type="text"
                        value={this.state.fields.usaBoxingId}
                        onChange={this.updateTextInputField}
                        label="USA Boxing Member ID Number"
                        updateErrors={this.updateErrors}
                        required={true}
                        errorPresent={this.state.errors.usaBoxingId && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={val => val.length !== 0}
                    />

                    <Field
                        name="wins"
                        type="text"
                        value={this.state.fields.wins}
                        onChange={this.updateTextInputField}
                        label="Wins"
                        required={true}
                        errorPresent={this.state.errors.wins && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={val => isInt(val)}

                    />

                    <Field
                        name="losses"
                        type="text"
                        value={this.state.fields.losses}
                        onChange={this.updateTextInputField}
                        label="Losses"
                        required={true}
                        errorPresent={this.state.errors.losses && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={val => isInt(val)}
                    />

                    <Field
                        name="boxingClubAffiliation"
                        type="text"
                        value={this.state.fields.boxingClubAffiliation}
                        onChange={this.updateTextInputField}
                        label="Boxing Club Affiliation"
                        required={true}
                        errorPresent={this.state.errors.boxingClubAffiliation && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={ val => val.length !== 0}
                    />

                    <Field
                        name="coachFirstName"
                        type="text"
                        value={this.state.fields.coachFirstName}
                        onChange={this.updateTextInputField}
                        label="Coach's First Name"
                        required={true}
                        errorPresent={this.state.errors.coachFirstName && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={val => val.length !== 0}
                    />
                    <Field
                        name="coachLastName"
                        type="text"
                        value={this.state.fields.coachLastName}
                        onChange={this.updateTextInputField}
                        label="Coach's Last Name"
                        required={true}
                        errorPresent={this.state.errors.coachLastName && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={val => val.length !== 0}
                    />
                    <Field
                        name="coachUSABoxingId"
                        type="text"
                        value={this.state.fields.coachUSABoxingId}
                        onChange={this.updateTextInputField}
                        label="Coach USA Boxing Memberr ID #"
                        required={true}
                        errorPresent={this.state.errors.coachUSABoxingId && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={val => val.length !== 0}
                    />
                    <Field
                        name="coachPhoneNumber"
                        type="text"
                        value={this.state.fields.coachPhoneNumber}
                        onChange={this.updateTextInputField}
                        label="Coach's Phone Number"
                        required={true}
                        errorPresent={this.state.errors.coachPhoneNumber && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={val => isMobilePhone(val)}
                    />
                    <Field
                        name="coachEmail"
                        type="text"
                        onChange={this.updateTextInputField}
                        value={this.state.fields.coachEmail}
                        label="Coach's Email Address"
                        required={true}
                        errorPresent={this.state.errors.coachEmail && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={val => isEmail(val)}
                    />
                    <Field
                        name="weight"
                        type="text"
                        onChange={this.updateTextInputField}
                        value={this.state.fields.weight}
                        label="Weight(lbs)"
                        required={true}
                        errorPresent={this.state.errors.weight && this.state.invalidSubmission}
                        updateErrors={this.updateErrors}
                        validation={val => isInt(val)}
                    />

                    <label style={{marginLeft:'10px'}}>
                        GENDER
                        {this.state.fields.gender === '' ? <span style={radioWarnings}>Must Pick One To Continue</span> : null}
                        <Field
                            name="gender"
                            type="checkbox"
                            label="Male"
                            checked={this.state.fields.gender === 'male'}
                            onChange={this.updateCheckboxField}
                            value='male'
                        />
                        
                        <Field
                            name="gender"
                            type="checkbox"
                            label="Female"
                            checked={this.state.fields.gender === 'female'}
                            onChange={this.updateCheckboxField}
                            value='female'
                        />
                    </label>
                    <br/>
                    
                    <div style={radioTextMargins}>
                        <label style={radioButtonTextStyle}>
                            I (We) agree to abide by the rules of USA Boxing, Inc. and will comply with the 
                            INT'L PARADE OF CHAMPIONS TOURNAMENT as detailed in the Fact Sheet 
                            (found on USABoxingMetro.com), and the Code of Conduct for Athlete/Non-Athlete.
                            {this.state.fields.rules === 'false' ? <span style={radioWarnings}>Must Agree To Continue</span> : null}
                            <Field
                                name="rules"
                                type="radio"
                                label="AGREE"
                                value={true}
                                onChange={this.updateRadioButtons}
                            />
                            
                            <Field
                                name="rules"
                                type="radio"
                                label="DISAGREE"
                                value={false}
                                onChange={this.updateRadioButtons}
                            />
                        </label>
                    </div>

                    <div style={radioTextMargins}>
                        <label style={radioButtonTextStyle}>
                            I (We) fully understand that I (we) assume all responsibility for any injury that he/she may incur 
                            in this boxing event(s). I (We) understand and agree that medical or other services rendered to Entrant 
                            by or at the instance of any of the named parties is not an admission of liability to provide or 
                            continue to provide any such services and is not a waiver by any of said parties of any right or rights hereunder.
                            {this.state.fields.injury === 'false' ? <span style={radioWarnings}>Must Agree To Continue</span> : null}
                            <Field
                                name="injury"
                                type="radio"
                                label="AGREE"
                                value={true}
                                onChange={this.updateRadioButtons}
                            />

                            <Field
                                name="injury"
                                type="radio"
                                label="DISAGREE"
                                value={false}
                                onChange={this.updateRadioButtons}
                            />
                        </label>                    
                    </div>

                    <div style={radioTextMargins}>
                        <label style={radioButtonTextStyle}>
                            I (We) certify the Entrant has not sustained any injury to his/her hands, consisting of fractures or 
                            broken bones, or injuries to his/her head, including, but not limited to, concussions within three(3) 
                            months preceding the date of this consent form, that the entrant has been seen by his/her physician 
                            and deemed to be in good health, and I (we) know of no other injuries that has been sustained which may 
                            reoccur in this boxing event. Furthermore, I (we) understand and appreciate that participation in sports carries 
                            a risk to the participant of serious injury, including permanent paralysis or death. I (we) voluntarily 
                            and knowingly recognize, accept, and assume this risk.
                            {this.state.fields.injuryWarning === 'false' ? <span style={radioWarnings}>Must Agree To Continue</span> : null}
                            <Field
                                name="injuryWarning"
                                type="radio"
                                label="AGREE"
                                value={true}
                                onChange={this.updateRadioButtons}
                            />

                            <Field
                                name="injuryWarning"
                                type="radio"
                                label="DISAGREE"
                                value={false}
                                onChange={this.updateRadioButtons}
                            />
                        </label>                    
                    </div>




                    <div style={radioTextMargins}>
                        <label style={radioButtonTextStyle}>
                            I, the Parent/Guardian of Above Boxer, hereby consent to the entry of said applicant in the
                            tournament and for myself (ourselves), my (our) heirs, executors, administrators, and assigns
                            waive and release any and all right to claim for damages I (we) may or might have against USA 
                            Boxing, Inc., USA Boxing Metropolitan Assoc, and New York Boxing Mgt Inc., or the officers, 
                            subcommittees, agents, representatives and assigns of these entities, for any injuries suffered
                            by boxer during his/her participation in the boxoffs, or arising from traveling to and returning
                            from said event.certify the Entrant has not sustained any injury to his/her hands, consisting 
                            of fractures or broken bones, or injuries to his/her head, including, but not limited to, concussions
                            within three(3) months preceding the date of this consent form, that the entrant has been seen by 
                            his/her physician and deemed to be in good health, and I (we) know of no other injuries that has 
                            been sustained which may reoccur in this boxing event.
                            {this.state.fields.waiver === 'false' ? <span style={radioWarnings}>Must Agree To Continue</span> : null}
                            <Field
                                name="waiver"
                                type="radio"
                                label="AGREE"
                                value={true}
                                onChange={this.updateRadioButtons}
                            />

                            <Field
                                name="waiver"
                                type="radio"
                                label="DISAGREE"
                                value={false}
                                onChange={this.updateRadioButtons}
                            /> 
                        </label>                    
                    </div>



                    <input
                        style={submitButton}
                        type="submit"
                        value="Submit"
                    />
                    {this.state.invalidSubmission ? <span style={{color:'red'}}>Invalid Submission</span> : null}
                </form>



            </div>
        )
    }
} 
