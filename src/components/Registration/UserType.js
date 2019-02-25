import React from 'react'


const firstTimeButton = {
    height:'120px',
    width:'300px',
    backgroundColor:'red',
    color:'white',
    cursor:'pointer',
    outline:'0',
    boxShadow: '2px 2px grey'
}

const returningButton = {
    ...firstTimeButton,
    backgroundColor: 'blue'
}


const UserType = (props) => {
    return(
        <div>
            Are you a
            <div>
                <button 
                    name="new" 
                    style={firstTimeButton}
                    onClick={props.updateButtonHandler}
                >
                    First Time Registrant:<br/>
                    You have never registered for a tournament via this platform 
                </button>

                <button 
                    name="old"
                    style={returningButton}
                    onClick={props.updateButtonHandler}
                >
                    Returning User:<br/>
                    You have registered for a tournament via this platform
                </button>
            </div>

        </div>
    )
}

export default UserType;