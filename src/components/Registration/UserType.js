import React from 'react'
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
                <Button 
                    name="new" 
                    style={firstTimeButton}
                    onClick={props.updateButtonHandler}>
                        First Time Registrant:<br/>
                        You have never registered for a tournament via this platform
                </Button>

                <Button 
                    name="old"
                    style={returningButton}
                    onClick={props.updateButtonHandler}>
                        Returning User:<br/>
                        You have registered for a tournament via this platform
                </Button>
            </Flex>

        </Flex>

    )
}

export default UserType;