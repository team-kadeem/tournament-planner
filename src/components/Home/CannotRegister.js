import React from 'react'
import { Link } from 'react-router-dom'
import Center from '../Shared/CenterContainer'

const CannotRegister = (props) => {
    const linkStyle = {
        color:'#fff'
    }

    return(
        <div>
            <Center direction={'column'}>
                <p>
                    Registration for this tournament is closed.
                </p>

                <p>
                    Click <Link style={linkStyle} to="/">here</Link> to return.
                </p>
                  
            </Center>
            
        </div>
    )
}

export default CannotRegister

