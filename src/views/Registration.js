import React from 'react'
import Field from '../components/Registration/Field'
import validator from 'validator'
import { FaAsterisk } from 'react-icons/fa'
import isPostalCode from 'validator/lib/isPostalCode';
import isMobilePhone from 'validator/lib/isMobilePhone';

export default class Registration extends React.Component {
    constructor(props){
        super(props)
        this.state = {
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
                rules:null,
                injury:null,
                injuryWarning:null,
                waiver:null
            },
            errors:{
                firstName:false,
                lastName:false,
                boxerEmail:false,
                zipCode:false,
                phoneNumber:false,
                dateOfBirth:false,
                usaBoxingId:false,
                wins:false,
                losses:false,
                boxingClubAffiliation:false,
                coachFirstName:false,
                coachLastName:false,
                coachUSABoxingId:false,
                coachFirstName:false,
                coachLastName:false,
                coachUSABoxingId:false,
                coachPhoneNumber:false,
                coachEmail:false,
                gender:false,
                weight:false,
                rules:false,
                injury:false,
                injuryWarning:false,
                waiver:false
            }
        }
    }
    updateTextInputField = (evt) => {
        console.log('updating input')
        let fields = Object.assign({}, this.state.fields)
        fields[evt.target.name] = evt.target.value
        this.setState({fields:fields})
    }

    updateCheckboxField = (evt) => {
        let fields = Object.assign({}, this.state.fields)
        fields[evt.target.name] = evt.target.value
        this.setState({fields:fields})
    }

    updateErrors = (targetName, value) => {
        let errors = Object.assign({}, this.state.errors)
        errors[targetName] = value
        this.setState({...this.state, errors:errors})
    }

    submitForm = (evt) => {
        evt.preventDefault()
        console.log('form submitted')
    }

    render(){

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
                        errorPresent={this.state.errors.firstName}
                        validation={() => this.state.fields.firstName.length !== 0}
                    />
                    <Field
                        name="lastName"
                        type="text"
                        value={this.state.fields.lastName}
                        label="Last Name"
                        onChange={this.updateTextInputField}
                        required={true}
                        updateErrors={this.updateErrors}
                        errorPresent={this.state.errors.lastName}
                        validation={data => !validator.isEmpty(data)}
                    />
                    <Field
                        name='boxerEmail'
                        type="text"
                        value={this.state.fields.boxerEmail}
                        label="Boxer's Email Address"
                        onChange={this.updateTextInputField}
                        required={true}
                        updateErrors={this.updateErrors}
                        errorPresent={this.state.errors.boxerEmail}
                        validation={data => validator.isEmail(data)}
                    />
                    <Field
                        name="zipCode"
                        type="text"
                        value={this.state.fields.zipCode}
                        label="Rsidence - Zip Code"
                        onChange={this.updateTextInputField}
                        required={true}
                        updateErrors={this.updateErrors}
                        errorPresent={this.state.errors.zipCode}
                        validation={data => isPostalCode(data, 'US')}

                    />
                    <Field
                        name="phoneNumber"
                        type="text"
                        value={this.state.fields.phoneNumber}
                        onChange={this.updateTextInputField}
                        label="Cell/Phone Number"
                        required={true}
                        errorPresent={this.state.errors.phoneNumber}
                        updateErrors={this.updateErrors}
                        validation={data => isMobilePhone(data, 'en-US')}

                    />

                    <Field
                        name="dateOfBirth"
                        type="text"
                        value={this.state.fields.dateOfBirth}
                        onChange={this.updateTextInputField}
                        label="Boxer's Date of Birth"
                        required={true}
                        errorPresent={this.state.errors.dateOfBirth}
                        updateErrors={this.updateErrors}

                    />

                    <Field
                        name="usaBoxingId"
                        type="text"
                        value={this.state.fields.usaBoxingId}
                        onChange={this.updateTextInputField}
                        label="USA Boxing Member ID Number"
                        
                        updateErrors={this.updateErrors}

                    />

                    <Field
                        name="wins"
                        type="text"
                        value={this.state.fields.wins}
                        onChange={this.updateTextInputField}
                        label="Wins"
                        required={true}
                        updateErrors={this.updateErrors}

                    />

                    <Field
                        name="losses"
                        type="text"
                        value={this.state.fields.losses}
                        onChange={this.updateTextInputField}
                        label="Losses"
                        required={true}
                        updateErrors={this.updateErrors}

                    />

                    <Field
                        name="boxingClubAffiliation"
                        type="text"
                        value={this.state.fields.boxingClubAffiliation}
                        onChange={this.updateTextInputField}
                        label="Boxing Club Affiliation"
                        required={true}
                    />

                    <Field
                        name="coachFirstName"
                        type="text"
                        value={this.state.fields.coachFirstName}
                        onChange={this.updateTextInputField}
                        label="Coach's First Name"
                    />
                    <Field
                        name="coachLastName"
                        type="text"
                        value={this.state.fields.coachLastName}
                        onChange={this.updateTextInputField}
                        label="Coach's Last Name"
                    />
                    <Field
                        name="coachUSABoxingId"
                        type="text"
                        value={this.state.fields.coachUSABoxingId}
                        onChange={this.updateTextInputField}
                        label="Coach USA Boxing Memberr ID #"
                    />
                    <Field
                        name="coachPhoneNumber"
                        type="text"
                        value={this.state.fields.coachPhoneNumber}
                        onChange={this.updateTextInputField}
                        label="Coach's Phone Number"
                    />
                    <Field
                        name="coachEmail"
                        type="text"
                        onChange={this.updateTextInputField}
                        value={this.state.fields.coachEmail}
                        label="Coach's Email Address"
                    />
                    <Field
                        name="weight"
                        type="text"
                        onChange={this.updateTextInputField}
                        value={this.state.fields.weight}
                        label="Weight"
                        required={true}
                    />

                    <label>
                        GENDER
                        <FaAsterisk style={{color:'red', position:'relative', fontSize:'8px', bottom:'7px', left:'2px'}}/>
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

                    <label>
                        I (We) agree to abide by the rules of USA Boxing, Inc. and will comply with the 
                        INT'L PARADE OF CHAMPIONS TOURNAMENT as detailed in the Fact Sheet 
                        (found on USABoxingMetro.com), and the Code of Conduct for Athlete/Non-Athlete.
                        <FaAsterisk style={{color:'red', position:'relative', fontSize:'8px', bottom:'7px', left:'2px'}}/>
                        <Field
                            name="rules"
                            type="radio"
                            label="AGREE"
                            value={true}
                            onChange={this.updateTextInputField}
                        />
                        
                        <Field
                            name="rules"
                            type="radio"
                            label="DISAGREE"
                            value={false}
                            onChange={this.updateTextInputField}
                        />
                    </label>

                    <label>
                        I (We) fully understand that I (we) assume all responsibility for any injury that he/she may incur 
                        in this boxing event(s). I (We) understand and agree that medical or other services rendered to Entrant 
                        by or at the instance of any of the named parties is not an admission of liability to provide or 
                        continue to provide any such services and is not a waiver by any of said parties of any right or rights hereunder.
                        <FaAsterisk style={{color:'red', position:'relative', fontSize:'8px', bottom:'7px', left:'2px'}}/>
                        <Field
                            name="injury"
                            type="radio"
                            label="AGREE"
                            value={true}
                            onChange={this.updateTextInputField}
                        />

                        <Field
                            name="injury"
                            type="radio"
                            label="DISAGREE"
                            value={false}
                            onChange={this.updateTextInputField}
                        />
                    </label>

                    <label>
                        I (We) certify the Entrant has not sustained any injury to his/her hands, consisting of fractures or 
                        broken bones, or injuries to his/her head, including, but not limited to, concussions within three(3) 
                        months preceding the date of this consent form, that the entrant has been seen by his/her physician 
                        and deemed to be in good health, and I (we) know of no other injuries that has been sustained which may 
                        reoccur in this boxing event. Furthermore, I (we) understand and appreciate that participation in sports carries 
                        a risk to the participant of serious injury, including permanent paralysis or death. I (we) voluntarily 
                        and knowingly recognize, accept, and assume this risk.
                        <FaAsterisk style={{color:'red', position:'relative', fontSize:'8px', bottom:'7px', left:'2px'}}/>
                        <Field
                            name="injuryWarning"
                            type="radio"
                            label="AGREE"
                            value={true}
                            onChange={this.updateTextInputField}
                        />

                        <Field
                            name="injuryWarning"
                            type="radio"
                            label="DISAGREE"
                            value={false}
                            onChange={this.updateTextInputField}
                        />
                    </label>

                    <label>
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
                        <FaAsterisk style={{color:'red', position:'relative', fontSize:'8px', bottom:'7px', left:'2px'}}/>
                        <Field
                            name="waiver"
                            type="radio"
                            label="AGREE"
                            value={true}
                            onChange={this.updateTextInputField}
                        />

                        <Field
                            name="waiver"
                            type="radio"
                            label="DISAGREE"
                            value={false}
                            onChange={this.updateTextInputField}
                        /> 
                    </label>


                    <input
                        type="submit"
                        value="Submit"
                    />
                </form>



            </div>
        )
    }
} 
