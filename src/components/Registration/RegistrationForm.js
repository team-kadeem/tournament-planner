import React from 'react'
import Field from './Field'
import isEmail from 'validator/lib/isEmail'
import isPostalCode from 'validator/lib/isPostalCode';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isBefore from 'validator/lib/isBefore'
import isInt from 'validator/lib/isInt'
import { Box } from 'rebass'
import { Link } from 'react-router-dom'

const RegistrationForm = (props) => {
    const submitButton = {
        padding:'10px 20px',
        border:'1px solid #333d54',
        color:'white',
        backgroundColor:'#333d54',
        fontSize:'18px',
        borderRadius:'4px',
        marginLeft:'10px',
        outline:'0',
        cursor:'pointer'
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
            <Box
                p={3}>
                <form onSubmit={props.submitHandler}>
                    <Field
                        name="firstName"
                        type="text"
                        value={props.values.firstName}
                        label="First Name"
                        onChange={props.textInputHandler}
                        required={true}
                        errorPresent={props.errors.firstName && props.errorPresent}
                        validation={ val => val.length !== 0}/>

                    <Field
                        name="lastName"
                        type="text"
                        value={props.values.lastName}
                        label="Last Name"
                        onChange={props.textInputHandler}
                        required={true}
                        errorPresent={props.errors.lastName && props.errorPresent}
                        validation={val => val.length !== 0}/>

                    <Field
                        name='boxerEmail'
                        type="text"
                        value={props.values.boxerEmail}
                        label="Boxer's Email Address"
                        onChange={props.textInputHandler}
                        required={true}
                        errorPresent={props.errors.boxerEmail && props.errorPresent}
                        validation={data => isEmail(data)}/>

                    <Field
                        name="zipCode"
                        type="text"
                        value={props.values.zipCode}
                        label="Residence - Zip Code"
                        onChange={props.textInputHandler}
                        required={true}
                        errorPresent={props.errors.zipCode && props.errorPresent}
                        validation={data => isPostalCode(data, 'US')}/>

                    <Field
                        name="phoneNumber"
                        type="text"
                        value={props.values.phoneNumber}
                        onChange={props.textInputHandler}
                        label="Cell/Phone Number"
                        required={true}
                        errorPresent={props.errors.phoneNumber && props.errorPresent}
                        validation={data => isMobilePhone(data, 'en-US')}/>

                    <Field
                        disabled={props.disableBirthday}
                        name="dateOfBirth"
                        type="text"
                        value={props.values.dateOfBirth}
                        onChange={props.textInputHandler}
                        label="Boxer's Date of Birth (MM/DD/YYYY)"
                        required={true}
                        errorPresent={props.errors.dateOfBirth && props.errorPresent}
                        validation={val => isBefore(val)}/>

                    <Field
                        disabled={props.disableId}
                        name="usaBoxingId"
                        type="text"
                        value={props.values.usaBoxingId}
                        onChange={props.textInputHandler}
                        label="USA Boxing Member ID Number"
                        required={true}
                        errorPresent={props.errors.usaBoxingId && props.errorPresent}
                        validation={val => val.length !== 0}/>

                    <Field
                        name="wins"
                        type="text"
                        value={props.values.wins}
                        onChange={props.textInputHandler}
                        label="Wins"
                        required={true}
                        errorPresent={props.errors.wins && props.errorPresent}
                        validation={val => isInt(val)}/>

                    <Field
                        name="losses"
                        type="text"
                        value={props.values.loss}
                        onChange={props.textInputHandler}
                        label="Losses"
                        required={true}
                        errorPresent={props.errors.loss && props.errorPresent}
                        validation={val => isInt(val)}/>
                    
                    {  
                        (parseInt(props.winsVal) + parseInt(props.lossVal)) >=5 &&
                        (parseInt(props.winsVal) + parseInt(props.lossVal)) <= 9 && 
                        !props.winsErr && 
                        !props.lossErr ? 
                            <label style={radioButtonTextStyle}>
                                You have the option to compete as Open or Novice
                                <Field
                                    name="experience"
                                    type="radio"
                                    label="OPEN"
                                    value="OPEN"
                                    onChange={props.experienceHandler}/>
                                
                                <Field
                                    name="experience"
                                    type="radio"
                                    label="NOVICE"
                                    value="NOVICE"
                                    onChange={props.experienceHandler}/>
                            </label> : null
                    }
                    <br/>

                    <Field
                        name="boxingClubAffiliation"
                        type="text"
                        value={props.values.boxingClubAffiliation}
                        onChange={props.textInputHandler}
                        label="Boxing Club Affiliation"
                        required={true}
                        errorPresent={props.errors.boxingClubAffiliation && props.errorPresent}
                        validation={ val => val.length !== 0}/>

                    <Field
                        name="coachFirstName"
                        type="text"
                        value={props.values.coachFirstName}
                        onChange={props.textInputHandler}
                        label="Coach's First Name"
                        required={true}
                        errorPresent={props.errors.coachFirstName && props.errorPresent}
                        validation={val => val.length !== 0}/>

                    <Field
                        name="coachLastName"
                        type="text"
                        value={props.values.coachLastName}
                        onChange={props.textInputHandler}
                        label="Coach's Last Name"
                        required={true}
                        errorPresent={props.errors.coachLastName && props.errorPresent}
                        validation={val => val.length !== 0}/>

                    <Field
                        name="coachUSABoxingId"
                        type="text"
                        value={props.coachUSABoxingId}
                        onChange={props.textInputHandler}
                        label="Coach USA Boxing Memberr ID #"
                        required={true}
                        errorPresent={props.errors.coachUSABoxingId && props.errorPresent}
                        validation={val => val.length !== 0}/>

                    <Field
                        name="coachPhoneNumber"
                        type="text"
                        value={props.values.coachPhoneNumber}
                        onChange={props.textInputHandler}
                        label="Coach's Phone Number"
                        required={true}
                        errorPresent={props.errors.coachPhoneNumber && props.errorPresent}
                        validation={val => isMobilePhone(val)}/>

                    <Field
                        name="coachEmail"
                        type="text"
                        onChange={props.textInputHandler}
                        value={props.values.coachEmail}
                        label="Coach's Email Address"
                        required={true}
                        errorPresent={props.errors.coachEmail && props.errorPresent}
                        validation={val => isEmail(val)}/>

                    <Field
                        name="weight"
                        type="text"
                        onChange={props.textInputHandler}
                        value={props.values.weight}
                        label="Weight(lbs)"
                        required={true}
                        errorPresent={props.errors.weight && props.errorPresent}
                        validation={val => isInt(val)}/>


                    <label style={{marginLeft:'10px'}}>
                        GENDER
                        {props.values.gender === '' ? <span style={radioWarnings}>Must Pick One To Continue</span> : null}
                        <Field
                            name="gender"
                            type="checkbox"
                            label="Male"
                            checked={props.values.gender === 'male'}
                            onChange={props.checkboxHandler}
                            value='male'
                            disabled={props.disableGender}/>
                        
                        <Field
                            name="gender"
                            type="checkbox"
                            label="Female"
                            checked={props.values.gender === 'female'}
                            onChange={props.checkboxHandler}
                            value='female'
                            disabled={props.disableGender}/>
                    </label>
                    <br/>
                        
                    <div style={radioTextMargins}>
                        <label style={radioButtonTextStyle}>
                            I (We) agree to abide by the rules of USA Boxing, Inc. and will comply with the 
                            INT'L PARADE OF CHAMPIONS TOURNAMENT as detailed in the Fact Sheet 
                            (found on USABoxingMetro.com), and the Code of Conduct for Athlete/Non-Athlete.
                            {props.values.rules === 'false' ? <span style={radioWarnings}>Must Agree To Continue</span> : null}
                            <Field
                                name="rules"
                                type="radio"
                                label="AGREE"
                                value={true}
                                onChange={props.radioHandler}/>
                            
                            <Field
                                name="rules"
                                type="radio"
                                label="DISAGREE"
                                value={false}
                                onChange={props.radioHandler}/>
                        </label>
                    </div>

                    <div style={radioTextMargins}>
                        <label style={radioButtonTextStyle}>
                            I (We) fully understand that I (we) assume all responsibility for any injury that he/she may incur 
                            in this boxing event(s). I (We) understand and agree that medical or other services rendered to Entrant 
                            by or at the instance of any of the named parties is not an admission of liability to provide or 
                            continue to provide any such services and is not a waiver by any of said parties of any right or rights hereunder.
                            {props.values.injury === 'false' ? <span style={radioWarnings}>Must Agree To Continue</span> : null}
                            <Field
                                name="injury"
                                type="radio"
                                label="AGREE"
                                value={true}
                                onChange={props.radioHandler}/>

                            <Field
                                name="injury"
                                type="radio"
                                label="DISAGREE"
                                value={false}
                                onChange={props.radioHandler}/>
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
                            {props.values.injuryWarning === 'false' ? <span style={radioWarnings}>Must Agree To Continue</span> : null}
                            <Field
                                name="injuryWarning"
                                type="radio"
                                label="AGREE"
                                value={true}
                                onChange={props.radioHandler}/>

                            <Field
                                name="injuryWarning"
                                type="radio"
                                label="DISAGREE"
                                value={false}
                                onChange={props.radioHandler}/>
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
                            {props.values.waiver === 'false' ? <span style={radioWarnings}>Must Agree To Continue</span> : null}
                            <Field
                                name="waiver"
                                type="radio"
                                label="AGREE"
                                value={true}
                                onChange={props.radioHandler}/>

                            <Field
                                name="waiver"
                                type="radio"
                                label="DISAGREE"
                                value={false}
                                onChange={props.radioHandler}/> 
                        </label>                    
                    </div>
                    
                    <input
                        style={submitButton}
                        type="submit"
                        value="Continue to Checkout"
                    />                     

                    <span style={{color:'green'}}>{props.formStatus}</span>
                    {props.errorPresent ? <span style={{color:'red'}}>Invalid Submission</span> : null}
                </form> 
            </Box>
        </div>
    )
}

export default RegistrationForm