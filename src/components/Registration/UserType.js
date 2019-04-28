import React from 'react'
import {RedButton, BlueButton} from '../Shared/Buttons'
import { Flex } from 'rebass'


const heading = {
    fontSize:'36px',
    textAlign:'center',
    marginBottom:'50px'
}

const buttonStyle = {
    height:'165px',
    width:'390px'
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