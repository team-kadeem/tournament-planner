import React from 'react'


const firstTimeButton = {
    height:'120px',
    width:'300px',
    backgroundColor:'red',
    color:'white',
    cursor:'pointer',
    outline:'0',
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
                    First Time Registrant
                </button>

                <button 
                    name="old"
                    style={returningButton}
                    onClick={props.updateButtonHandler}
                >
                    Returning User
                </button>
            </div>

        </div>
    )
}

export default UserType;