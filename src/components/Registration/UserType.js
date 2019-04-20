import React from 'react'
import {RedButton, BlueButton} from '../Shared/Buttons'
import { Flex, Button } from 'rebass'


const heading = {
    fontSize:'36px',
    textAlign:'center',
    marginBottom:'50px'
}

const firstTimeButton = {
    height:'175px',
    width:'400px',
    backgroundColor:'#E73235',
    color:'#fff',
    cursor:'pointer',
    outline:'0',
    borderRadius:'20px',
    marginBottom:'30px'
}

const returningButton = {
    ...firstTimeButton,
    backgroundColor: '#333d54'
}

const buttonHeading = {
    fontWeight:'700',
    fontSize:'18px'
}

const buttonStyle = {
    height:'165px',
    width:'390px'
}

const buttonSubheading = {
    fontSize:'14px'
}


const UserType = (props) => {
    return(
        <Flex 
            flexDirection='column'>

            <h2 style={heading}>Are You A</h2>
            <Flex
                flexWrap='wrap'
                justifyContent='space-around'>
                    <RedButton
                        name="new"
                        custom={buttonStyle}
                        buttonHandler={props.updateButtonHandler}>
                            First Time Registrant: <br/>
                            You have never registered for a tournament<br/>
                             via this platform
                    </RedButton>

                    <BlueButton
                        name="old"
                        custom={buttonStyle}
                        buttonHandler={props.updateButtonHandler}>
                            Returning User: <br/>
                            You have registered for a tournament<br/>
                            via this platform
                    </BlueButton>
            </Flex>

        </Flex>

    )
}

export default UserType;