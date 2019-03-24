import React from 'react'
import './Styles/UserType.css'


const heading = {
    fontSize:'36px'
}

const firstTimeButton = {
    height:'175px',
    width:'400px',
    backgroundColor:'#cb4e4e',
    color:'#fff',
    cursor:'pointer',
    outline:'0',
    borderRadius:'20px'
}

const returningButton = {
    ...firstTimeButton,
    backgroundColor: '#0e78c6'
}

const buttonHeading = {
    fontWeight:'700',
    fontSize:'18px'
}

const buttonSubheading = {
    fontSize:'14px'
}


const UserType = (props) => {
    return(
        <div className="user-type-container">
        <h2 style={heading}>Are You A</h2>
            <div className="button-container">
                <button 
                    name="new" 
                    style={firstTimeButton}
                    onClick={props.updateButtonHandler}
                >
                    <span style={buttonHeading}>First Time Registrant:</span><br/>
                    <span style={buttonSubheading}>
                        You have never registered for a tournament via this platform
                    </span> 
                </button>

                <button 
                    name="old"
                    style={returningButton}
                    onClick={props.updateButtonHandler}
                >
                    <span style={buttonHeading}>Returning User:</span><br/>
                    <span style={buttonSubheading}>
                        You have registered for a tournament via this platform
                    </span> 
                </button>
            </div>

        </div>
    )
}

export default UserType;